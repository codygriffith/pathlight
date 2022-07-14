const { v4: uuidv4 } = require('uuid');
import fetch from "node-fetch";

exports.handler = async function (event, context) {
    // const { identity, user } = context.clientContext;
    // if ( user || identity ) {
    const id = uuidv4();
    console.log('red');
    console.log(event.body)
    const url = JSON.parse(event.body);

    let body = {url, id}

    console.log(body)

    let res = await fetch(`https://sqs.us-east-1.amazonaws.com/054477282436/pathlight-MySqsQueue-7Av0SPeLhEXe/?Action=SendMessage&MessageBody=${body}`);

    return {
        statusCode: 200,
        body: JSON.stringify({ url: url, id: id }),
    };
    // }
};