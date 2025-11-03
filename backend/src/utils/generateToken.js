import config from "../config/config.js";
import jwt from "jsonwebtoken"


// Generate Access Token (short-lived)
export const generateAccessToken = (user) => {
            return jwt.sign(
                        { id: user._id, email: user.email, roles: user.roles },
                        config.JWT_ACCESS_SECRET,
                        { expiresIn: "15m" }
            );
};

// Generate Refresh Token (long-lived)
export const generateRefreshToken = (user) => {
            return jwt.sign(
                        { id: user._id },
                        config.JWT_REFRESH_SECRET,
                        { expiresIn: "7d" }
            );
};


export const generateVerificationToken = (userId) => {
            return jwt.sign({ id: userId }, config.JWT_SECRET, { expiresIn: "15m" });
};