require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const {
  requestLogger,
  addTimeStamp,
} = require("./middleware/customMiddleware");
const configureCors = require("./corsConfig");
const {
  urlVersioning,
  headerVersioning,
  contentTypeVersioning,
} = require("./middleware/apiVersion");
const { createBasicRateLimiter } = require("./middleware/rateLimiting");
const {
  APIError,
  asyncHandler,
  globalErrorHandler,
} = require("./middleware/errorHandler");
const itemRoutes = require("./routes/item-routes");
const PORT = process.env.PORT || 3000;
//middleware
app.use(requestLogger);
app.use(addTimeStamp);
app.use(configureCors());
app.use(express.json());
app.use(urlVersioning("v1"));
app.use(createBasicRateLimiter(15, 15 * 60 * 1000)); // 100 requests per 15 minutes
app.use("/api/v1", itemRoutes);
app.use(globalErrorHandler);
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
