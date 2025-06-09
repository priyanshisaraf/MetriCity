import { WiThermometer, WiHumidity, WiSmoke } from "react-icons/wi";
import { FaCloudSun, FaWind, FaEye, FaTemperatureHigh } from "react-icons/fa";
import { BsSunrise, BsSunset, BsClouds, BsSpeedometer2 } from "react-icons/bs";

export default function WeatherCard({ weather, aqi }) {
  const {
    name,
    main,
    weather: conditions,
    wind,
    visibility,
    sys,
    clouds,
  } = weather;

  const iconMap = {
    Thunderstorm: "🌩",
    Drizzle: "🌦",
    Rain: "🌧",
    Snow: "❄️",
    Clear: "☀️",
    Clouds: "☁️",
  };

  const condition = conditions[0];

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg space-y-4 ring-1 ring-white/10">
      <h2 className="text-xl font-semibold text-center">
        {name.toUpperCase()} ({sys.country})
      </h2>

      <div className="text-center">
        <div className="text-5xl">{iconMap[condition.main] || "🌈"}</div>
        <p className="text-lg font-medium mt-1">🌦 {condition.main}</p>
        <p className="italic text-sm text-gray-300">{condition.description}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center text-sm">
        <div>
          <p className="font-bold text-lg">🌡 {main.temp}°C</p>
          <p className="text-xs">Feels like: {main.feels_like}°C</p>
        </div>
        <div>
          <p className="font-semibold">💧 Humidity</p>
          <p>{main.humidity}%</p>
        </div>
        <div>
          <p className="font-semibold">🌫 AQI</p>
          <p>{aqi}</p>
        </div>
        <div>
          <p className="font-semibold">💨 Wind</p>
          <p>{wind.speed} km/h</p>
        </div>
        <div>
          <p className="font-semibold">🔭 Visibility</p>
          <p>{visibility / 1000} km</p>
        </div>
        <div>
          <p className="font-semibold">🧭 Pressure</p>
          <p>{main.pressure} hPa</p>
        </div>
        <div>
          <p className="font-semibold">🌅 Sunrise</p>
          <p>{new Date(sys.sunrise * 1000).toLocaleTimeString("en-IN")}</p>
        </div>
        <div>
          <p className="font-semibold">🌇 Sunset</p>
          <p>{new Date(sys.sunset * 1000).toLocaleTimeString("en-IN")}</p>
        </div>
        <div>
          <p className="font-semibold">☁️ Clouds</p>
          <p>{clouds.all}%</p>
        </div>
      </div>
    </div>
  );
}
