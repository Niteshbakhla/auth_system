import nodemailer from "nodemailer"
const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                        user: "niteshbakhla007@gmail.com",
                        pass: "cvnl awli uiks hhfs"
            }
});

export default transporter;