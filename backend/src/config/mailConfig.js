import nodemailer from "nodemailer"
import { Resend } from "resend";
import config from "./config.js";
const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                        user: "***************@gmai.com",
                        pass: "****************"
            }
});

const resend = new Resend(config.RESEND_API_KEY);
export default resend;