import express from "express";
import {
    createUser,
    getAllUser,
    getUserById,
} from "../controllers/user.controller.js";

const route = express.Router();

route.post("/user", createUser);
route.get("/user", getAllUser);
route.get("/user/:id", getUserById);

export default route;
