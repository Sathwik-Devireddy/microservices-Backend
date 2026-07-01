//custome error class to handle errors

class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "APIError"; // Set the name property to "APIError"
  }
}
const asyncHandler = (fn) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack); //here stack means the error stack trace, which provides information about where the error occurred in the code.
  //It helps developers identify the source of the error and debug it effectively.
  if (err instanceof APIError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ success: false, message: err.message });
  } else {
    return res
      .status(500)
      .json({ success: false, message: "unexpected Server Error" });
  }
};
module.exports = { APIError, asyncHandler, globalErrorHandler };
