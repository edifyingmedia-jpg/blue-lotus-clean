// backend/api/heartbeat.js
export default function handler(req, res) {
  return res.status(200).json({
    status: "alive",
    timestamp: Date.now(),
    message: "Blue Lotus backend is running in ESM mode."
  });
}
