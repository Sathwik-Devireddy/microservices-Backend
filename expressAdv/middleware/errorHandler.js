//custome error class to handle errors

//receptionist to handle errors
class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "APIError"; // Set the name property to "APIError" this was done to distinguish this custom error class from other error types in JavaScript.
    //  By setting the name property, we can easily identify instances of APIError when handling errors in our application.
    //this error handles errors like 404, 500, 400, etc. and sends the error message to the client in a structured format.
  }
}
//doctor to handle errors
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
//emeregency room
const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack); //here stack means the error stack trace, which provides information about where the error occurred in the code.
  //It helps developers identify the source of the error and debug it effectively.
  if (err instanceof APIError) {
    // Check if the error is an instance of APIError (true or false)
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ success: false, message: err.message });
    //this handles errors such as validation errors, which occur when the input data does not meet the expected criteria or format. It sends a 400 Bad Request response with the error message to the client.
  } else {
    return res
      .status(500)
      .json({ success: false, message: "unexpected Server Error" });
    //this handles any other unexpected errors that may occur in the application. It sends a 500 Internal Server Error response with a generic error message to the client, indicating that something went wrong on the server side.
  }
};
module.exports = { APIError, asyncHandler, globalErrorHandler };
