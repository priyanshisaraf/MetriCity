export default function MapEmbed({ city }) {
  return (
    <div className="w-full h-60 rounded-xl overflow-hidden shadow-md ring-1 ring-white/10">
      <iframe
        title="map"
        width="100%"
        height="100%"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_KEY}&q=${encodeURIComponent(city)}`}
      />
    </div>
  );
}
