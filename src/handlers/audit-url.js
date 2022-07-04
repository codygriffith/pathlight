// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
const lighthouse = require('lighthouse');
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
        if (event.httpMethod !== 'POST') {
            throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
        }

        // Get id and name from the body of the request
        const body = JSON.parse(event.body);
        const url = body.url;
        const id = body.id;

        const chrome2 = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
        });

        console.log(chrome2)
        console.log(await chromium.executablePath)
        console.log('red')

        let page = await chrome2.newPage();

        await page.goto(`http://${url}` || 'https://alenthea.com');

        let title = await page.title();

        console.log(title);

        // const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless','--no-sandbox','--disable-gpu','--disable-dev-shm-usage'] });
        const options = { logLevel: 'info', output: 'html', port: (new URL(chrome2.wsEndpoint())).port };
        const runnerResult = await lighthouse(`http://${url}`, options);

        console.log('Report is done for', runnerResult.lhr.finalUrl);
        console.log('Performance score was', runnerResult.lhr.categories);
        // console.log(runnerResult)

        const bestPracticesScore = runnerResult.lhr.categories["best-practices"].score;

        var params = {
            TableName : tableName,
            Item: { id : id, url : url, scores: {bestPractices: bestPracticesScore}}
        };

        const result = await docClient.put(params).promise();

        console.log(result)

        response = {
            'statusCode': 200,
            'body': runnerResult.report
        }

    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
