import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/customError.js";
import config from "../config/config.js";

export const verifyAccessToken = asyncHandler(
            (req, res, next) => {
                        const authHeader = req.headers.authorization;
                     
                        if (!authHeader || !authHeader.startsWith("Bearer "))
                                    throw new CustomError("No token provided", 401);

                        const token = authHeader.split(" ")[1];

                        try {
                                    const decoded = jwt.verify(token, config.JWT_ACCESS_SECRET);
                                    req.user = decoded.id;
                                    next();
                        } catch (error) {
                                    throw new CustomError("Invalid or expired access token", 401);
                        }
            }
)

export const verifyRefreshToken = asyncHandler(
            (req, res, next) => {
                        const authHeader = req.cookies.token;

                        if (!token) throw new CustomError("No refresh token", 401);

                        const token = authHeader.split(" ")[1];

                        try {
                                    const decoded = jwt.verify(token, config.JWT_REFRESH_SECRET);
                                    req.user = decoded.id;
                                    next();
                        } catch (error) {
                                    throw new CustomError("Invalid or expired refresh token", 403);
                        }
            }

)