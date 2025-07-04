import { Link } from "react-router-dom";
import { Building2, MailCheck, ShieldCheck, SlidersHorizontal  } from "lucide-react";
export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-gray-100 px-4 py-10 flex flex-col items-center justify-start overflow-hidden">

      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-indigo-800/10 to-blue-900/30 blur-3xl -z-10" />

      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl top-[-150px] left-[-150px] -z-10" />
      <div className="absolute w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-2xl bottom-[-100px] right-[-100px] -z-10" />

      {/* Hero Section */}
      <div className="text-center space-y-3.5">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text leading-tight md:leading-snug tracking-tight">
          Welcome to MetriCity
        </h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto text-gray-300">
          Real-time AQI, weather, and personalized alerts for your city.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition transform hover:scale-105"
          >
            Get Started
          </Link>
          <Link
            to="/demo"
            className="border border-blue-400 text-blue-400 dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-500/10 transition transform hover:scale-105"
          >
            Try Demo
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="mt-20 max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-2">
        <div className="bg-white/10 dark:bg-gray-800/40 backdrop-blur-md border border-white/10 dark:border-gray-700 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <Building2 className="mx-auto text-blue-500 dark:text-blue-400 w-8 h-8 mb-2" />
          <p className="font-semibold text-lg">Live AQI & Weather</p>
          <p className="text-sm text-gray-300">
            Get real-time AQI and weather data for major Indian cities.
          </p>
        </div>

        <div className="bg-white/10 dark:bg-gray-800/40 backdrop-blur-md border border-white/10 dark:border-gray-700 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <MailCheck className="mx-auto text-green-500 dark:text-green-400 w-8 h-8 mb-2" />
          <p className="font-semibold text-lg">Automated Email Alerts</p>
          <p className="text-sm text-gray-300">
            Stay notified when pollution or heat levels cross safe limits.
          </p>
        </div>

        <div className="bg-white/10 dark:bg-gray-800/40 backdrop-blur-md border border-white/10 dark:border-gray-700 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <ShieldCheck className="mx-auto text-purple-500 dark:text-purple-400 w-8 h-8 mb-2" />
          <p className="font-semibold text-lg">Secure & Private</p>
          <p className="text-sm text-gray-300">
            Login with Firebase and protect your environmental data.
          </p>
        </div>
        <div className="bg-white/10 dark:bg-gray-800/40 backdrop-blur-md border border-white/10 dark:border-gray-700 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <SlidersHorizontal className="mx-auto text-yellow-500 dark:text-yellow-400 w-8 h-8 mb-2" />
        <p className="font-semibold text-lg">Custom Thresholds</p>
        <p className="text-sm text-gray-300 mb-1">
          Prefer tighter controls? Define your own limits for AQI, temperature, or humidity.
        </p>
        <p className="text-xs text-gray-400">Auto alerts adjust to your personal settings.</p>
      </div>
      </div>
<div className="mt-20 max-w-7xl w-full text-left space-y-4">
  <h2 className="text-3xl font-bold text-center mb-6 text-white">Frequently Asked Questions</h2>

  <details className="bg-white/5 dark:bg-gray-800/40 rounded-lg p-5 group">
    <summary className="cursor-pointer font-semibold text-blue-400 group-open:text-blue-300 text-lg">
      How does MetriCity know the weather and pollution levels?
    </summary>
    <p className="mt-3 text-md text-gray-300 leading-relaxed">
      We connect to trusted services that track live weather and air quality in cities. This includes temperature,
      humidity, and pollution (AQI). Our system checks this data every hour to make sure you’re always up-to-date.
    </p>
  </details>

  <details className="bg-white/5 dark:bg-gray-800/40 rounded-lg p-5 group">
    <summary className="cursor-pointer font-semibold text-blue-400 group-open:text-blue-300 text-lg">
      Will I get alerts when things get bad?
    </summary>
    <p className="mt-3 text-md text-gray-300 leading-relaxed">
      Yes! If the pollution or weather crosses safe levels in your city, we’ll send you an email alert. You’ll know
      right away when it’s time to stay indoors or take precautions.
    </p>
  </details>

  <details className="bg-white/5 dark:bg-gray-800/40 rounded-lg p-5 group">
    <summary className="cursor-pointer font-semibold text-blue-400 group-open:text-blue-300 text-lg">
      Can I set my own safe limits?
    </summary>
    <p className="mt-3 text-md text-gray-300 leading-relaxed">
      Absolutely. By default, we use general safety levels. But if you’re more sensitive or want tighter controls, you
      can choose your own limits for AQI, temperature, and humidity — right inside your settings.
    </p>
  </details>

  <details className="bg-white/5 dark:bg-gray-800/40 rounded-lg p-5 group">
    <summary className="cursor-pointer font-semibold text-blue-400 group-open:text-blue-300 text-lg">
      Which cities does MetriCity support?
    </summary>
    <p className="mt-3 text-md text-gray-300 leading-relaxed">
      We support all major cities across India — including Delhi, Mumbai, Kolkata, Chennai, Bengaluru, and Hyderabad. More locations will be
      added soon!
    </p>
  </details>

  <details className="bg-white/5 dark:bg-gray-800/40 rounded-lg p-5 group">
    <summary className="cursor-pointer font-semibold text-blue-400 group-open:text-blue-300 text-lg">
      Is my information safe here?
    </summary>
    <p className="mt-3 text-md text-gray-300 leading-relaxed">
      Yes, totally. We use secure login and store only the necessary info to send you alerts. We never share your data
      with anyone. Your privacy is important to us.
    </p>
  </details>
</div>

      {/* Footer */}
      <footer className="mt-20 text-sm text-gray-400 text-center">
        © {new Date().getFullYear()} <span className="text-white font-semibold">MetriCity</span> · Built with ❤️ in India
      </footer>
    </div>
  );
}
