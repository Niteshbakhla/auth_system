import { config } from "dotenv";
config();


const _confg = {
            MONGO_URI: process.env.MONGO_URI,
            JWT_ACCESS_SECRET: process.env.ACCESS_TOKEN_SECRET,
            JWT_REFRESH_SECRET: process.env.REFRESH_TOKEN_SECRET,
            NODE_ENV: process.env.NODE_ENV,
            JWT_SECRET: process.env.JWT_SECRET,
            RESEND_API_KEY: process.env.RESEND_API_KEY,
            SENDER_EMAIL: process.env.SENDER_EMAIL
}



export default Object.freeze(_confg);
