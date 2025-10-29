import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "../db/database.sqlite",
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

export { sequelize, testConnection };
