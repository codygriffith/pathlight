console.log('blue')
import fetch from "node-fetch";
console.log('green')


export async function handler (event, context) {
    // const { identity, user } = context.clientContext;
    // if ( user || identity ) {
        console.log('red')
        const rawReports = await fetch(process.env.API_ENDPOINT);
		const reports = await rawReports.json();
		console.log(reports);
        return {
            statusCode: 200,
            body: JSON.stringify({ reports }),
        };
    // }
}