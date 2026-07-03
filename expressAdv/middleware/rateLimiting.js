const rateLimit = require("express-rate-limit");
const createBasicRateLimiter = (maxRequests, time) => {
  return rateLimit({
    max: maxRequests,
    windowsMs: time,
    message: "Too many requests, please try again later.",
    standardzHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });
};
module.exports = { createBasicRateLimiter };
