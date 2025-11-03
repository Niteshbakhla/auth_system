import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { globalError } from "./middlewares/globalError.js";
import router from "./routes/index.js";
import config from "./config/config.js";
const app = express();

app.use(express.json());
app.use(cors({
            origin: "http://localhost:5173",
            credentials: "true"
}))

console.log(config.NODE_ENV)
app.use(cookieParser())


app.use("/", router)


app.use(globalError)

export default app;     