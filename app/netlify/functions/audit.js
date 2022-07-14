import { v4 as uuidv4 } from 'uuid';
import fetch from "node-fetch";

exports.handler = async function (event, context) {
    // const { identity, user } = context.clientContext;
    // if ( user || identity ) {
    const id = uuidv4();
    console.log('red');
    console.log(event.body)
    const url = JSON.parse(event.body);

    let body = JSON.stringify({url, id})

    console.log(body)

    let res = await fetch(`${process.env.SQS_ENDPOINT}/?Action=SendMessage&MessageBody=${body}`);

    return {
        statusCode: 200,
        body: JSON.stringify({ url: url, id: id }),
    };
    // }
};