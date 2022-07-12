exports.handler = async function (event, context) {
    // const { identity, user } = context.clientContext;
    // if ( user || identity ) {
        console.log('red')
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Hello World", endpoint: process.env.API_ENDPOINT }),
        };
    // }
};