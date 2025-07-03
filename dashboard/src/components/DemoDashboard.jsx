// src/components/DemoDashboard.jsx
import MapEmbed from "./MapEmbed";
export default function DemoDashboard() {
  const mockData = {
    city: "Delhi",
    temp: 36,
    feelsLike: 38,
    humidity: 72,
    aqi: 165,
    clouds: 40,
    wind: 12,
    visibility: 6500,
    sunrise: new Date().setHours(5, 35),
    sunset: new Date().setHours(19, 10),
    pressure: 1012,
  };

  const getAqiLabel = (aqi) => {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy for sensitive groups";
    if (aqi <= 200) return "Unhealthy";
    if (aqi <= 300) return "Very Unhealthy";
    return "Hazardous";
  };

  const cards = [
    {
      icon: "🌡️",
      label: "Temperature",
      value: `${mockData.temp}°C`,
      sub: `Feels like ${mockData.feelsLike}°C`,
    },
    {
      icon: "💧",
      label: "Humidity",
      value: `${mockData.humidity}%`,
    },
    {
      icon: "🌫️",
      label: "Air Quality Index (AQI)",
      value: mockData.aqi,
      sub: getAqiLabel(mockData.aqi),
    },
    {
      icon: "☁️",
      label: "Cloud Cover",
      value: `${mockData.clouds}%`,
    },
    {
      icon: "💨",
      label: "Wind Speed",
      value: `${mockData.wind} km/h`,
    },
    {
      icon: "🔭",
      label: "Visibility",
      value: `${(mockData.visibility / 1000).toFixed(1)} km`,
    },
    {
      icon: "🌅",
      label: "Sunrise",
      value: new Date(mockData.sunrise).toLocaleTimeString(),
    },
    {
      icon: "🌇",
      label: "Sunset",
      value: new Date(mockData.sunset).toLocaleTimeString(),
    },
    {
      icon: "📈",
      label: "Pressure",
      value: `${mockData.pressure} hPa`,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 px-4 py-5 relative flex flex-col items-center">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-2">
          Demo Dashboard
        </h1>
        <p className="text-md max-w-2xl mx-auto text-gray-300 mt-5">
          This is a preview of how MetriCity shows your city's environment in real time. The data below is mock data for <strong>Delhi</strong>. Sign up to start monitoring your own city!
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl w-full mt-5 px-2">
        {cards.map(({ icon, label, value, sub }, idx) => (
          <div
            key={idx}
            className="bg-gray-800/70 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="text-lg font-semibold tracking-wide text-gray-400">
              {icon} {label}
            </div>
            <p className="text-3xl font-bold text-blue-400">{value}</p>
            {sub && <p className="text-xs mt-1 text-gray-400 italic">{sub}</p>}
          </div>
        ))}
      </div>
<div className="mt-10 w-full max-w-5xl">
  <MapEmbed city="delhi" />

  <div className="mt-6 bg-yellow-900/30 text-yellow-100 p-3 rounded-xl text-center shadow-md border border-yellow-600">
    <h3 className="text-lg font-bold mb-2">Alert Status</h3>
    <p className="text-sm">Real alerts available after signup.</p>
  </div>
</div>
    </div>
  );
}
