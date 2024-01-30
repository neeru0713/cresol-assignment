module.exports = {
  API_URL:
    process.env.NODE_ENV === "production"
      ? "https://cresol-event-management.onrender.com"
      : "http://localhost:8080",
};
