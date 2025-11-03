class CustomError extends Error {
            constructor(message, statusCode) {
                        super(message); // Call parent constructor with the message
                        this.statusCode = statusCode;

                        // Capture the stack trace (helps debugging)
                        Error.captureStackTrace(this, this.constructor);
            }
}

export default CustomError;
