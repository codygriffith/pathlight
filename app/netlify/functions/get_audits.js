console.log('blue')
import fetch from "node-fetch";
console.log('green')

exports.handler = async function (event, context) {
    // const { identity, user } = context.clientContext;
    // if ( user || identity ) {
        console.log('red')
        // let reports = {};
        const rawReports = await fetch(process.env.API_ENDPOINT);
		const reports = await rawReports.json();
		console.log(reports);
        return {
            statusCode: 200,
            body: JSON.stringify({ reports }),
        };
    // }
};