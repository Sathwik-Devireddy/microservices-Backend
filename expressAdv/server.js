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
  APIError,
  asyncHandler,
  globalErrorHandler,
} = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3000;
//middleware
app.use(requestLogger);
app.use(addTimeStamp);
app.use(configureCors());
app.use(express.json());
app.use(globalErrorHandler);
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
