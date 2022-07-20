let response;
const lighthouse = require('lighthouse');
// const chromium = require('chrome-aws-lambda');
const chromium = require('@sparticuz/chrome-aws-lambda');
const { URL } = require('url');
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

// Get the DynamoDB table name from environment variables
const reportTable = process.env.REPORT_TABLE;
const rawReportTable = process.env.RAW_REPORT_TABLE;

exports.auditUrlHandler = async (event, context) => {
    try {
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

        console.log('Report is done for', runnerResult.lhr.finalUrl);

        const performanceScore = runnerResult.lhr.categories["performance"].score;
        const accessibilityScore = runnerResult.lhr.categories["accessibility"].score;
        const bestPracticesScore = runnerResult.lhr.categories["best-practices"].score;
        const seoScore = runnerResult.lhr.categories["seo"].score;
        // const pwaScore = runnerResult.lhr.categories["pwa"].score;


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
            }
        };

        let result = await docClient.put(params).promise();

        var params = {
            TableName: rawReportTable,
            Item: {
                id: id,
                rawJson: JSON.stringify(runnerResult.lhr)
            }
        };

        result = await docClient.put(params).promise();

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
