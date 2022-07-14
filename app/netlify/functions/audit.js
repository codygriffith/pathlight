const { v4: uuidv4 } = require('uuid');

exports.handler = async function (event, context) {
    // const { identity, user } = context.clientContext;
    // if ( user || identity ) {
    const id = uuidv4();
    console.log('red');
    console.log(event.body)
    const url = JSON.parse(event.body);
    return {
        statusCode: 200,
        body: JSON.stringify({ url: url, id: id }),
    };
    // }
};