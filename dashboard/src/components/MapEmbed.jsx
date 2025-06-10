export default function MapEmbed({ city }) {
  const mapKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;

  if (!city || !mapKey) {
    return (
      <div className="w-full h-60 rounded-xl flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
        Map unavailable — missing city or API key.
      </div>
    );
  }

  return (
    <div className="w-full h-60 rounded-xl overflow-hidden shadow-md ring-1 ring-white/10">
      <iframe
        title="map"
        width="100%"
        height="100%"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${mapKey}&q=${encodeURIComponent(city)}`}
      />
    </div>
  );
}
