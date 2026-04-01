export const timeAgo = (date) => {
  // Date.now() = time now in ms
  // new Date(date) = convert "2026-03-20 10:00:00" into Date object
  // date is "2026-03-20 10:00:00" raw string from MySQL created_at

  // date now (in ms) - date in created_at / 1000 to get s
  const diff = Math.floor((Date.now() - new Date(date)) / 1000);
  if (diff < 60) return `${diff}s ago`; // if < 60s, show ...s ago
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`; // if < 1h, show ...m ago
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`; // if < 1d, show ...h ago
  return `${Math.floor(diff / 86400)}d ago`; // show day
};
