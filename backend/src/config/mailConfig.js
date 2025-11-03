import nodemailer from "nodemailer"
import { Resend } from "resend";
import config from "./config.js";
const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                        user: "niteshbakhla007@gmail.com",
                        pass: "cvnl awli uiks hhfs"
            }
});

const resend = new Resend(config.RESEND_API_KEY);
export default resend;