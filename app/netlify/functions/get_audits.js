console.log('blue')
import fetch from "node-fetch";
console.log('green')

exports.handler = async function (event, context) {
    // const { identity, user } = context.clientContext;
    // if ( user || identity ) {
        console.log('red')
        exclusiveStartKey = event.queryStringParameters.exclusiveStartKey || null;
        console.log(`Exclusive start key: ${exclusiveStartKey}`)
        // let reports = {};
        console.log(event)
        const rawReports = await fetch(`${process.env.API_ENDPOINT}/?exclusiveStartKey=${exclusiveStartKey}`);
		const reports = await rawReports.json();
		console.log(reports.lastEvaluatedKey);
        return {
            statusCode: 200,
            body: JSON.stringify({ reports }),
        };
    // }
};