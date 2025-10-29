import { sequelize } from "../config/connectionDB.js";
import User from "./user.model.js";

const synchroniseModels = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log("Synchronization successful!");
    } catch (error) {
        console.log(`Error synchronizing models: ${error}`);
    }
};

export { User, synchroniseModels };
