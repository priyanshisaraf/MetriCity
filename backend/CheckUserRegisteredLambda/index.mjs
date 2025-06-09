import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { email } = body;

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing email" }),
      };
    }

    const command = new GetCommand({
      TableName: "CityPulseUsers",
      Key: { email },
    });

    const result = await docClient.send(command);
    const registered = !!result.Item;

    return {
      statusCode: 200,
      body: JSON.stringify({
        registered,
        user: result.Item || null, 
      }),
    };
  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Server error", error: err.message }),
    };
  }
};
