console.log('heheh')
const fetch = require( "node-fetch");
const reportHtml = require( "./report.txt");
console.log('ttttttttt')

exports.handler = async function (event, context) {
  // const { identity, user } = context.clientContext;
  // if ( user || identity ) {

  const rawReport = await fetch(`${process.env.API_ENDPOINT}/${event.queryStringParameters.id}`);
  const report = await rawReport.json();

  return {
    statusCode: 200,
    body: reportHtml.replace('__GET_LIGHTHOUSE_JSON__', report.rawJson),
  };
  // }
};