import express from "express";
import {
    createUser,
    deleteUserById,
    getAllUser,
    getAuthUser,
    getUserById,
} from "../controllers/user.controller.js";

const route = express.Router();

route.post("/user", createUser);
route.get("/user", getAllUser);
route.get("/user/:id", getUserById);
route.post("/user/auth", getAuthUser);
route.delete("/user/:id", deleteUserById);

export default route;
