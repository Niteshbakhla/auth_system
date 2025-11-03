import { Router } from "express";
import { loginUser, logoutUser, registerUser, verifyUser } from "../controllers/authController.js";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";

const router = Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/verify").get(verifyUser)
router.route("/logout").get(verifyAccessToken, logoutUser);


export default router;