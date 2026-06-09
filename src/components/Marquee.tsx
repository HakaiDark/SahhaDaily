const marqueeItems = [
  "🌿 100% verified originals · بضاعة أصلية مضمونة",
  "🇬🇧 Directly sourced from Europe · من أوروبا",
  "🚚 Delivered to your door · توصيل لحد عندك",
  "💬 Order on WhatsApp · اطلب على واتساب",
];

export function Marquee() {
  const set = [...marqueeItems, ...marqueeItems];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {set.map((m, i) => (
          <span className="marquee-item" key={i}>{m}<span className="dot" /></span>
        ))}
      </div>
    </div>
  );
}
