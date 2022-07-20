// Create clients and set shared const values outside of the handler.

// Get the DynamoDB table name from environment variables
const tableName = process.env.REPORT_TABLE;

// Create a DocumentClient that represents the query to add an item
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

/**
 * A simple example includes a HTTP get method to get all items from a DynamoDB table.
 */
exports.getAllItemsHandler = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    const exclusiveStartKey = undefined;

    // get all items from the table (only first 1MB data, you can use `LastEvaluatedKey` to get the rest of data)
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property
    // https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html

    if (exclusiveStartKey === undefined) {
        console.log('hello')
        var params = {
            TableName: tableName
        };
    } else {
        console.log('bye')
        var params = {
            TableName: tableName,
            ExclusiveStartKey: {
                "id": exclusiveStartKey,
            }
        };
    }


    console.log(`Exclusive start key: ${exclusiveStartKey}`)

    const data = await docClient.scan(params).promise();
    console.log(data)
    const items = data.Items;
    const lastEvaluatedKey = data.LastEvaluatedKey || '';
    console.log(lastEvaluatedKey)

    const response = {
        statusCode: 201,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ items, lastEvaluatedKey })
    };

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
