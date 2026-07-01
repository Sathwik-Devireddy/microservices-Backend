const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip;
  const userAgent = req.get("User-Agent");

  console.log(`${timestamp} ${method} ${url} ${ip} ${userAgent}`);
  next();
};
const addTimeStamp = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
};
module.exports = { requestLogger, addTimeStamp };
