// Updated Dashboard.jsx with separate cards and alert status section
import React, { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import RegistrationForm from "./Registration";
import { useNavigate } from "react-router-dom";
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

  console.log("Response:", res);

  const result = await res.json();
  console.log("Parsed Result:", result);

  setAlertMessage(result.message || "No alerts required right now.");
} catch (err) {
  console.error("Fetch failed:", err);
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
const navigate = useNavigate();
  const handleLogout = () => signOut(auth).then(() => navigate("/"))
    .catch((err) => console.error("Logout error:", err));
  const handleRegistrationSuccess = () => {
    setIsRegistered(true);
    window.location.reload();
  };
console.log("State check:", { isRegistered, weather, aqi });

  if (isRegistered === null) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-800 text-gray-200">
      Checking registration status...
    </div>
  );
}

if (!isRegistered) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200">
      <RegistrationForm email={user.email} onSuccess={handleRegistrationSuccess} />
    </div>
  );
}

if (!weather || aqi === null) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200">
      Loading dashboard...
    </div>
  );
}
const getAqiLabel = (aqi) => {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for sensitive groups";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
};


const {
  main,
  wind,
  visibility,
  sys,
  name,
  clouds,
} = weather;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 px-4 py-5 relative flex flex-col items-center">
      <div className="text-center space-y-2 mb-6">
      <h1 className="text-6xl leading-tight font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
        MetriCity
      </h1>
      <p className="text-lg italic">Logged in as: <strong>{user.email}</strong></p>
      <p className="text-md">Selected city: <strong>{name}</strong></p>
    </div>

{/* Weather & AQI Info Cards */}
<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl w-full mt-5 px-2">
  {[
    {
      icon: "🌡️",
      label: "Temperature",
      value: `${main.temp}°C`,
      sub: `Feels like ${main.feels_like}°C`,
    },
    {
      icon: "💧",
      label: "Humidity",
      value: `${main.humidity}%`,
    },
    {
      icon: "🌫️",
      label: "Air Quality Index (AQI)",
      value: aqi,
      sub: getAqiLabel(aqi),
    },
    {
      icon: "☁️",
      label: "Cloud Cover",
      value: `${clouds.all}%`,
    },
    {
      icon: "💨",
      label: "Wind Speed",
      value: `${wind.speed} km/h`,
    },
    {
      icon: "🔭",
      label: "Visibility",
      value: `${(visibility / 1000).toFixed(1)} km`,
    },
    {
      icon: "🌅",
      label: "Sunrise",
      value: new Date(sys.sunrise * 1000).toLocaleTimeString(),
    },
    {
      icon: "🌇",
      label: "Sunset",
      value: new Date(sys.sunset * 1000).toLocaleTimeString(),
    },
    {
      icon: "📈",
      label: "Pressure",
      value: `${main.pressure} hPa`,
    },
  ].map(({ icon, label, value, sub }, idx) => (
    <div
      key={idx}
      className="bg-white/10 bg-gray-800/70 backdrop-blur-lg border border-white/10 border-gray-700 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="text-lg font-semibold tracking-wide text-gray-400">{icon}  {label}</div>
      <p className="text-3xl font-bold text-blue-400">{value}</p>
      {sub && <p className="text-xs mt-1 text-gray-400 italic">{sub}</p>}
    </div>
  ))}
</div>

<div className="mt-10 w-full max-w-5xl">
  <MapEmbed city={userCity} />

  <div className="mt-6 bg-yellow-900/30 text-yellow-100 p-3 rounded-xl text-center shadow-md border border-yellow-600">
    <h3 className="text-lg font-bold mb-2">Alert Status</h3>
    <p className="text-sm">{alertMessage}</p>
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