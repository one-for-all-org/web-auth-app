import express from "express";
import dotenv from "dotenv";
import { testConnection } from "./src/config/connectionDB.js";
import { synchroniseModels } from "./src/models/index.js";
import { morganMiddleware } from "./src/middlewares/middlewares.js";
import routeUser from "./src/routes/user.route.js";
import cors from "cors"

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors("*"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morganMiddleware);
app.use("/api/v1", routeUser);

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
