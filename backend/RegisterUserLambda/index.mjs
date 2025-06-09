import { readFile } from 'fs/promises';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  try {
    const raw = await readFile(new URL('./thresholds.json', import.meta.url));
    const thresholds = JSON.parse(raw.toString());

    const body = JSON.parse(event.body);
    const { email, city, ageGroup, mode, aqi, temp, humidity } = body;

    let finalThresholds = {};

    if (mode === "auto") {
      finalThresholds =
        thresholds.city_overrides[city]?.[ageGroup] ||
        thresholds.global_defaults[ageGroup];
    } else {
      finalThresholds = {
        aqi: parseFloat(aqi),
        temp_max: parseFloat(temp),
        humidity_max: parseFloat(humidity),
      };
    }

    const userItem = {
      email,
      city,
      ageGroup,
      mode,
      thresholds: finalThresholds,
    };

    const command = new PutCommand({
      TableName: "CityPulseUsers",
      Item: userItem,
    });

    await docClient.send(command);

    return {
      statusCode: 200,
       headers: {
        "Access-Control-Allow-Origin": "*", // Replace * with your frontend domain in production
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({
        message: "User registered successfully",
        data: userItem,
      }),
    };
  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*", // Replace * with your frontend domain in production
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ message: "Internal Server Error", error: err.message }),
    };
  }
};
