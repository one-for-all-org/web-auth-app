import { DataTypes, Model, UUIDV4 } from "sequelize";
import { sequelize } from "../config/connectionDB.js";

class User extends Model {
    otherPublicField;
    getInfo() {
        return `${this.name} ${this.email}`;
    }
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: emailRegex,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { sequelize, modelName: "User", tableName: "users", timestamps: true }
);

export default User;
