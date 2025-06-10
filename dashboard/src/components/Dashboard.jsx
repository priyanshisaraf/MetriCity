// Updated Dashboard.jsx with separate cards and alert status section
import React, { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import RegistrationForm from "./Registration";
import DarkModeToggle from "./DarkModeToggle";
import MapEmbed from "./MapEmbed";
export default function Dashboard({ user }) {
  const [isRegistered, setIsRegistered] = useState(null);
  const [userCity, setUserCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [alertMessage, setAlertMessage] = useState("Loading alert status...");
  const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const aqiApiKey = import.meta.env.VITE_AQI_API_KEY;
  useEffect(() => {
  console.log("DEBUG STATE:", { isRegistered, userCity, weather, aqi });
}, [isRegistered, userCity, weather, aqi]);
  useEffect(() => {
    const checkAndRegisterUser = async () => {
      try {
  const res = await fetch("https://clsjsh11ug.execute-api.ap-south-1.amazonaws.com/dev/CheckUserRegistered", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: user.email }),
  });
  const data = await res.json();
  
  setIsRegistered(data.registered); 

  if (data.user?.city) {
    setUserCity(data.user.city);
  }
} catch (err) {
  console.error("Error checking user registration:", err);
}
    };

    if (user?.email) checkAndRegisterUser();
  }, [user.email]);

  useEffect(() => {
    const checkConditionsAndAlert = async () => {
      if (!userCity) return;

      try {
        const res = await fetch("https://fjigw7et5i.execute-api.ap-south-1.amazonaws.com/dev/trigger-alerts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city: userCity }),
        });
        const result = await res.json();
        setAlertMessage(result.message || "No alerts required right now.");
      } catch (err) {
        console.error("Failed to trigger alerts:", err);
        setAlertMessage("Unable to determine alert status.");
      }
    };

    checkConditionsAndAlert();
  }, [userCity]);

  useEffect(() => {
    const fetchConditions = async () => {
      if (!userCity) return;

      try {
        const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${weatherApiKey}&units=metric`);
        const weatherData = await weatherRes.json();
        setWeather(weatherData);

        const aqiRes = await fetch(`https://api.waqi.info/feed/${userCity}/?token=${aqiApiKey}&units=metric`);
        const aqiData = await aqiRes.json();
        setAqi(aqiData.data.aqi);
      } catch (err) {
        console.error("Failed to fetch conditions:", err);
      }
    };

    fetchConditions();
  }, [userCity, weatherApiKey, aqiApiKey]);

  const handleLogout = () => signOut(auth);
  const handleRegistrationSuccess = () => {
    setIsRegistered(true);
    window.location.reload();
  };
console.log("State check:", { isRegistered, weather, aqi });

  if (isRegistered === null) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      Checking registration status...
    </div>
  );
}

if (!isRegistered) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <RegistrationForm email={user.email} onSuccess={handleRegistrationSuccess} />
    </div>
  );
}

if (!weather || aqi === null) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      Loading dashboard...
    </div>
  );
}


const {
  main,
  wind,
  visibility,
  sys,
  name,
  clouds,
} = weather;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-4 py-5 relative flex flex-col items-center">
      <DarkModeToggle />
      <div className="text-center space-y-2 mb-6">
      <h1 className="text-6xl leading-tight font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
        MetriCity
      </h1>
      <p className="text-lg italic">Logged in as: <strong>{user.email}</strong></p>
      <p className="text-md">Selected city: <strong>{name}</strong></p>
    </div>


      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-4xl w-full">
        <div className="bg-gray-100 dark:bg-blue-800 text-gray-900 dark:text-white rounded-lg p-4 shadow transition">
          <p className="text-lg font-bold">🌡 Temp</p>
          <p>{main.temp}°C</p>
          <p className="text-sm">Feels like: {main.feels_like}°C</p>
        </div>
        <div className="bg-gray-100 dark:bg-blue-800 text-gray-900 dark:text-white rounded-lg p-4 shadow transition">
          <p className="text-lg font-bold">💧 Humidity</p>
          <p>{main.humidity}%</p>
        </div>
        <div className="bg-gray-100 dark:bg-blue-800 text-gray-900 dark:text-white rounded-lg p-4 shadow transition">
          <p className="text-lg font-bold">🌫 AQI</p>
          <p>{aqi}</p>
        </div>
        <div className="bg-gray-100 dark:bg-blue-800 text-gray-900 dark:text-white rounded-lg p-4 shadow transition">
          <p className="text-lg font-bold">☁️ Clouds</p>
          <p>{clouds.all}%</p>
        </div>
        <div className="bg-gray-100 dark:bg-blue-800 text-gray-900 dark:text-white rounded-lg p-4 shadow transition">
          <p className="text-lg font-bold">💨 Wind</p>
          <p>{wind.speed} km/h</p>
        </div>
        <div className="bg-gray-100 dark:bg-blue-800 text-gray-900 dark:text-white rounded-lg p-4 shadow transition">
          <p className="text-lg font-bold">🔭 Visibility</p>
          <p>{visibility / 1000} km</p>
        </div>
        <div className="bg-gray-100 dark:bg-blue-800 text-gray-900 dark:text-white rounded-lg p-4 shadow transition">
          <p className="text-lg font-bold">🌅 Sunrise</p>
          <p>{new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
        </div>
        <div className="bg-gray-100 dark:bg-blue-800 text-gray-900 dark:text-white rounded-lg p-4 shadow transition">
          <p className="text-lg font-bold">🌇 Sunset</p>
          <p>{new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
        </div>
        <div className="bg-gray-100 dark:bg-blue-800 text-gray-900 dark:text-white rounded-lg p-4 shadow transition">
          <p className="font-semibold text-lg">🌡️ Pressure</p>
          <p>{main.pressure} hPa</p>
</div>
      </div>
      <div className="mt-10 w-full max-w-4xl">
        <MapEmbed city={userCity} />
        <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg p-3 shadow transition text-center">
          <h3 className="text-xl font-semibold mb-2">Alerts status</h3>
          <p>{alertMessage}</p>
        </div>
      </div>

      <div className="mt-6">
        {!isRegistered ? (
          <RegistrationForm email={user.email} onSuccess={handleRegistrationSuccess} />
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold shadow-lg transition-all duration-200"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}