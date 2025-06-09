import fetch from "node-fetch";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import thresholds from './thresholds.json' assert { type: "json" };

function getThreshold(city, ageGroup) {
  if (
    thresholds.city_overrides[city] &&
    thresholds.city_overrides[city][ageGroup]
  ) {
    return thresholds.city_overrides[city][ageGroup];
  }
  return thresholds.global_defaults[ageGroup];
}

const docClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const sesClient = new SESClient({ region: "ap-south-1" });

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const AQICN_API_KEY = process.env.AQICN_API_KEY;

export const handler = async (event) => {
  try {
    const { city } = JSON.parse(event.body || "{}");

    if (!city) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "City is required in the request body." }),
      };
    }

    const users = await getUsersByCity(city);

    for (const user of users) {
      const weather = await fetchWeather(user.city);
      const aqiData = await fetchAQI(user.city);

      if (!weather || !aqiData) continue;

      const userThresholds = user.mode === "manual"
        ? user.thresholds
        : getThreshold(user.city, user.ageGroup);

      const shouldAlert = (
        aqiData.aqi > userThresholds.aqi ||
        weather.temperature > userThresholds.temp_max ||
        weather.humidity > userThresholds.humidity_max
      );

      if (shouldAlert) {
        await sendAlertEmail(user.email, user.city, weather, aqiData, userThresholds);
        console.log(`Alert sent to ${user.email}`);
      } else {
        console.log(`No alert needed for ${user.email}`);
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Notifications processed for city: " + city }),
    };

  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error occurred", error: err.message }),
    };
  }
};

const getUsersByCity = async (city) => {
  const command = new ScanCommand({ TableName: "CityPulseUsers" });
  const result = await docClient.send(command);
  return (result.Items || []).filter(user => user.city === city);
};

const fetchWeather = async (city) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    return {
      temperature: data.main.temp,
      humidity: data.main.humidity
    };
  } catch (err) {
    console.error("Weather fetch error:", err);
    return null;
  }
};

const fetchAQI = async (city) => {
  try {
    const url = `https://api.waqi.info/feed/${city}/?token=${AQICN_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    return {
      aqi: data.data.aqi
    };
  } catch (err) {
    console.error("AQI fetch error:", err);
    return null;
  }
};

const sendAlertEmail = async (to, city, weather, aqi, thresholds) => {
  const subject = `CityPulse: Air & Weather Update for ${city}`;
  const body = `
  Hello there!

    Conditions in ${city} have exceeded your thresholds:

    - AQI: ${aqi.aqi} (Limit: ${thresholds.aqi})
    - Temperature: ${weather.temperature}°C (Limit: ${thresholds.temp_max}°C)
    - Humidity: ${weather.humidity}% (Limit: ${thresholds.humidity_max}%)

    Stay hydrated and avoid outdoor activity if needed and please take necessary precautions.

    — 
    This alert was sent by CityPulse.
    To unsubscribe, reply STOP.
  `;

  const command = new SendEmailCommand({
    Destination: { ToAddresses: [to] },
    Message: {
      Subject: { Data: subject },
      Body: { Text: { Data: body } }
    },
    Source: "metricity.notify@gmail.com"
  });

  await sesClient.send(command);
};
