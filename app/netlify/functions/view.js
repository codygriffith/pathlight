import fetch from "node-fetch";
import reportHtml from "./report.txt";

exports.handler = async function (event, context) {
  // const { identity, user } = context.clientContext;
  // if ( user || identity ) {
  console.log('rd')

  const rawReport = await fetch(`${process.env.API_ENDPOINT}/${event.queryStringParameters.id}`);

  console.log('fdfd')

  const report = await rawReport.json();

  return {
    statusCode: 200,
    body: reportHtml.replace('__GET_LIGHTHOUSE_JSON__', report.rawJson),
  };
  // }
};