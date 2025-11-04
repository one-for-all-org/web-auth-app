import express from "express";
import {
    createUser,
    deleteUserById,
    getAllUser,
    getUserById,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/user", createUser);
router.get("/user", getAllUser);
router.get("/user/:id", getUserById);
router.delete("/user/delete/:id", deleteUserById);

export default router;
