
export const globalError = (err, req, res, next) => {
            const message = err.message || "Internal server error";
            const statusCode = err.statusCode || 500;
            res.status(statusCode).json({ message, success: false })
}