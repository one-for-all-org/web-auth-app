import success from "../helper/success.js";
import { User } from "../models/index.js";

const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const newUser = await User.create({
            name,
            email,
            password,
            role,
        });
        const message = "user created successful !";
        res.status(201).json(success(message, newUser));
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error during user creation",
            error: error.message,
        });
    }
};

const getAllUser = async (req, res) => {
    try {
        const data = await User.findAll();
        const message = "All user are geted";
        res.status(200).json(success(message, data));
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error to get all user",
            error,
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User with id ${id} not found`,
            });
        }
        const message = `User found successfully!`;
        res.status(200).json(success(message, user));
    } catch (error) {
        res.status(200).json({
            success: false,
            message: `Internal server error`,
            error: error.message,
        });
    }
};

export { createUser, getAllUser, getUserById };
