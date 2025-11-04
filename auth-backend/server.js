import express from "express";
import dotenv from "dotenv";
import { testConnection } from "./src/config/connectionDB.js";
import { synchroniseModels } from "./src/models/index.js";
import { morganMiddleware } from "./src/middlewares/middlewares.js";
import routeUser from "./src/routes/user.route.js";
import authRoutes from "./src/routes/auth.route.js";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(morganMiddleware);
app.use("/api/v1", routeUser);
app.use("/api/v1/auth", authRoutes);

const startServer = async () => {
    await testConnection();
    await synchroniseModels();

    app.get("/", (req, res) => {
        res.status(200).send({ message: "Hello World !" });
    });

    app.listen(port, () => {
        try {
            console.log(`Server run on http://localhost:${port}`);
        } catch (error) {
            console.log(`Error during run application : ${error}`);
        }
    });
};

startServer();
