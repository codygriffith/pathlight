// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
const lighthouse = require('lighthouse');

// const chromium = require('chrome-aws-lambda');
const chromium = require('@sparticuz/chrome-aws-lambda');

const { v4: uuidv4 } = require('uuid');
// const chromeLauncher = require('chrome-launcher');
const chromium = require('chrome-aws-lambda');

const { URL } = require('url');


// Create a DocumentClient that represents the query to add an item
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

// Get the DynamoDB table name from environment variables
const reportTable = process.env.REPORT_TABLE;
const rawReportTable = process.env.RAW_REPORT_TABLE;


exports.auditUrlHandler = async (event, context) => {
    try {
        // const id = uuidv4();
        const req = JSON.parse(event.Records[0].body);
        const id = req.id;
        const url = req.url;

        console.log('chromium args')
        console.log(JSON.stringify(chromium.args))
        console.log('chrmoium viewport')
        console.log(JSON.stringify(chromium.defaultViewport))

        const chrome2 = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
        });

        // let page = await chrome2.newPage();

        // await page.goto(`https://${url}` || 'https://alenthea.com');


        // Speed index audit giving intermittent null results. 
        const options = { logLevel: 'info', formFactor: 'desktop', screenEmulation:{disabled: true}, onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo', 'pwa'], skipAudits: ['full-page-screenshot', 'script-treemap-data', 'critical-request-chains', 'screenshot-thumbnails', 'user-timings', 'network-requests'], output: 'html', port: (new URL(chrome2.wsEndpoint())).port }; //'final-screenshot', 'speed-index',
        const runnerResult = await lighthouse(`https://${url}`, options);

        // const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless','--no-sandbox','--disable-gpu','--disable-dev-shm-usage'] });
        // const options = { logLevel: 'info', onlyCategories: ['performance','accessibility','best-practices','seo'], skipAudits: ['full-page-screenshot','screenshot-thumbnails','script-treemap-data','critical-request-chains','final-screenshot','user-timings','network-requests'], output: 'html', port: (new URL(chrome2.wsEndpoint())).port };
        // const runnerResult = await lighthouse(`http://${url}`, options);


        console.log('Report is done for', runnerResult.lhr.finalUrl);

        // console.log(runnerResult)

        // console.log(JSON.stringify(runnerResult))

        // console.log(runnerResult.lhr)
        // console.log(JSON.stringify(runnerResult.lhr))

        const performanceScore = runnerResult.lhr.categories["performance"].score;
        const accessibilityScore = runnerResult.lhr.categories["accessibility"].score;
        const bestPracticesScore = runnerResult.lhr.categories["best-practices"].score;
        const seoScore = runnerResult.lhr.categories["seo"].score;
        // const pwaScore = runnerResult.lhr.categories["pwa"].score;




        console.log(JSON.stringify(runnerResult.lhr))
        // runnerResult.lhr.audits['full-page-screenshot'].details.screenshot.data = "data:image/jpeg;"
        // runnerResult.lhr.audits['full-page-screenshot'].details.nodes = "{}"
        // console.log(runnerResult.lhr.audits['screenshot-thumbnails'].details.items)
        // runnerResult.lhr.audits['screenshot-thumbnails'].details.items.splice(4, 5);
        // console.log(runnerResult.lhr.audits['screenshot-thumbnails'].details.items)
        // console.log(runnerResult.lhr.audits['full-page-screenshot'])


        // delete runnerResult.lhr.audits["full-page-screenshot"]
        // console.log(runnerResult.lhr.audits)

        var params = {
            TableName: reportTable,
            Item: {
                id: id,
                url: url,
                timestamp: new Date().toUTCString(),
                scores: {
                    performance: performanceScore,
                    accessibility: accessibilityScore,
                    bestPractices: bestPracticesScore,
                    seo: seoScore
                    // pwa: pwaScore
                },
                // rawJson: JSON.stringify(runnerResult.lhr)
            }
        };

        let result = await docClient.put(params).promise();

        console.log(result)

        var params = {
            TableName: rawReportTable,
            Item: {
                id: id,
                rawJson: JSON.stringify(runnerResult.lhr)
            }
        };

        result = await docClient.put(params).promise();

        console.log(result)

        console.log(context)


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
