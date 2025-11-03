import User from "../models/User.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/customError.js";
import config from "../config/config.js";
import { generateAccessToken, generateRefreshToken, generateVerificationToken } from "../utils/generateToken.js"
import { sendVerificationEmail } from "../services/emailServices.js";

// ==========================================================
// Controllers
// ==========================================================

// @desc    Register new user
// @route   POST /api/auth/register
export const registerUser = asyncHandler(async (req, res, next) => {
            const { name, email, password } = req.body;

            if (!name || !email || !password)
                        throw new CustomError("All fields are required", 400);

            const existingUser = await User.findOne({ email });
            if (existingUser) throw new CustomError("Email already registered", 400);


            const newUser = await User.create({ name, email, password });

            // Generating token
            const accessToken = generateAccessToken(newUser);
            const token = generateVerificationToken(newUser._id)

            // Send verification email
            const verificationLink = `https://auth-system-6f4d.onrender.com/api/auth/verify?token=${token}`;
            await sendVerificationEmail(newUser.email, verificationLink);


            res.status(201).json({
                        success: true,
                        message: "User registered successfully",
                        user: {
                                    id: newUser._id,
                                    name: newUser.name,
                                    email: newUser.email,
                        },
                        accessToken,
            });
});

// @desc    Login user
// @route   POST /api/auth/login
export const loginUser = asyncHandler(async (req, res, next) => {
            const { email, password } = req.body;

            if (!email || !password)
                        throw new CustomError("Email and password are required", 400);

            const user = await User.findOne({ email });
            if (!user) throw new CustomError("Invalid credentials", 401);

            const isMatch = await user.comparePassword(password);
            if (!isMatch) throw new CustomError("Invalid credentials", 401);

            if (!user.isVerified) {
                        throw new CustomError("Email not verified", 400);
            }

            user.lastLogin = new Date();
            await user.save();

            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);


            res.cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        secure: config.NODE_ENV === "production",
                        sameSite: "strict",
                        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            res.status(200).json({
                        success: true,
                        message: "Login successful",
                        user: {
                                    id: user._id,
                                    name: user.name,
                                    email: user.email,
                        },
                        accessToken,
            });
});


// @desc verify token
// @route GET/ api/auth/verify      

export const verifyUser = asyncHandler(async (req, res) => {
            const token = req.query.token;
            return console
            if (!token) {
                        throw new CustomError("Please provide a token")
            }
            const decoded = jwt.verify(token, config.JWT_SECRET);
            const user = await User.findById(decoded.id);
            if (!user) return res.status(404).json({ message: "User not found" });

            if (user.isVerified) return res.status(200).json({ message: "Already verified" });
            user.isVerified = true;
            await user.save();

            res.status(200).json({ message: "Email verified successfully!" });

})


// @desc    Logout user
// @route   POST /api/auth/logout
export const logoutUser = asyncHandler(async (req, res, next) => {
            const token = req.headers.authorization.split(" ");

            if (!token) throw new CustomError("not token found", 400);

            res.status(200).json({
                        success: true,
                        message: "Logged out successfully",
            });
});

// @desc    Refresh access token
// @route   POST /api/auth/refresh
export const refreshAccessToken = asyncHandler(async (req, res, next) => {
            const { refreshToken } = req.cookies;

            if (!refreshToken)
                        throw new CustomError("Refresh token is required", 401);

            try {
                        // Verify token validity
                        const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);


                        const user = await User.findById(decoded.id);
                        if (!user) throw new CustomError("User not found", 404);

                        const newAccessToken = generateAccessToken(user);

                        res.status(200).json({
                                    success: true,
                                    accessToken: newAccessToken,
                        });
            } catch (err) {
                        throw new CustomError("Invalid or expired refresh token", 401);
            }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
export const getProfile = asyncHandler(async (req, res, next) => {
            const user = await User.findById(req.user.id).select("-password");
            if (!user) throw new CustomError("User not found", 404);

            res.status(200).json({
                        success: true,
                        user,
            });
});


