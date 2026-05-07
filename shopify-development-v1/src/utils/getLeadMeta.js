export const getLeadMeta = async () => {
  // IP + Location (free, no API key needed)
  let ip = "N/A", country = "N/A", city = "N/A";
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    ip = data.ip || "N/A";
    country = data.country_name || "N/A";
    city = data.city || "N/A";
  } catch (e) {
    console.warn("Could not fetch IP/location", e);
  }

  // IST Date & Time
  const now = new Date();
  const istOptions = { timeZone: "Asia/Kolkata", hour12: true };
  const date = now.toLocaleDateString("en-IN", { ...istOptions, day: "2-digit", month: "short", year: "numeric" });
  const time = now.toLocaleTimeString("en-IN", { ...istOptions, hour: "2-digit", minute: "2-digit", second: "2-digit" });

  // Device Info
  const ua = navigator.userAgent;
  let deviceType = "Desktop";
  if (/Mobi|Android/i.test(ua)) deviceType = "Mobile";
  else if (/Tablet|iPad/i.test(ua)) deviceType = "Tablet";

  // Device Name (best guess from UA)
  let deviceName = "Unknown";
  if (/iPhone/.test(ua)) deviceName = "iPhone";
  else if (/iPad/.test(ua)) deviceName = "iPad";
  else if (/Android/.test(ua)) {
    const match = ua.match(/Android[^;]*;\s*([^)]+)/);
const matched = match ? match[1].trim() : "";
deviceName = matched.length > 2 ? matched : "Android Device";
  } else if (/Windows/.test(ua)) deviceName = "Windows PC";
  else if (/Macintosh/.test(ua)) deviceName = "Mac";
  else if (/Linux/.test(ua)) deviceName = "Linux PC";

  return { ip, country, city, date, time, deviceType, deviceName };
};