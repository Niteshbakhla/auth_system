import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { globalError } from "./middlewares/globalError.js";
import router from "./routes/index.js";
const app = express();

app.use(express.json());
app.use(cors({
            origin: "http://localhost:5173",
            credentials: "true"
}))
app.use(cookieParser())


app.use("/", router)


app.use(globalError)

export default app;     