const cors = require("cors");
const configureCors = () => {
  return cors({
    origin: (origin, callback) => {
      const allowedOrigins = ["http://localhost:3000", "https://example.com"];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept-Version"],
    exposedHeaders: ["Content-Type", "Authorization", "Accept-Version"],
    credentials: true,
    preflightContinue: false,
    maxAge: 600, // Cache preflight response for 10 minutes avoid unnecessary multiple preflight requests
    optionsSuccessStatus: 204,
  });
};
module.exports = configureCors;
