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

app.get('/crash', (req, res) => {
            throw new Error("Simulated crash");
});


app.get("/", (req, res) => {
            res.sendFile("welcome.html", { root: "." });
});

app.use(cookieParser())


app.use("/", router)


app.use(globalError)

export default app;     