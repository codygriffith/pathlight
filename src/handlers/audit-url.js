// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
const lighthouse = require('lighthouse');
const { v4: uuidv4 } = require('uuid');
// const chromeLauncher = require('chrome-launcher');
const chromium = require('chrome-aws-lambda');
const { URL } = require('url');

// Create a DocumentClient that represents the query to add an item
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

// Get the DynamoDB table name from environment variables
const tableName = process.env.SAMPLE_TABLE;



exports.auditUrlHandler = async (event, context) => {
    try {
        // const id = uuidv4();
        const id = event.Records[0].body.id;
        const url = event.Records[0].body.url;

        const chrome2 = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
        });

        let page = await chrome2.newPage();

        await page.goto(`http://${url}` || 'https://alenthea.com');

        // const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless','--no-sandbox','--disable-gpu','--disable-dev-shm-usage'] });
        const options = { logLevel: 'info', output: 'html', port: (new URL(chrome2.wsEndpoint())).port };
        const runnerResult = await lighthouse(`http://${url}`, options);

        console.log('Report is done for', runnerResult.lhr.finalUrl);

        const performanceScore = runnerResult.lhr.categories["performance"].score;
        const accessibilityScore = runnerResult.lhr.categories["accessibility"].score;
        const bestPracticesScore = runnerResult.lhr.categories["best-practices"].score;
        const seoScore = runnerResult.lhr.categories["seo"].score;

        var params = {
            TableName: tableName,
            Item: {
                id: id,
                url: url,
                timestamp: new Date().toUTCString(),
                scores: {
                    performance: performanceScore,
                    accessibility: accessibilityScore,
                    bestPractices: bestPracticesScore,
                    seo: seoScore
                }
            }
        };

        const result = await docClient.put(params).promise();

        console.log(result)

        response = {
            'statusCode': 201,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
            'body': runnerResult.report
        }

    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
