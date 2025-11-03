import { DataTypes, Model, UUIDV4 } from "sequelize";
import { sequelize } from "../config/connectionDB.js";
import bcrypt from "bcrypt";

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
            unique: true,
            validate: {
                is: emailRegex,
            },
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
/**
 * intercepte les data avant le POST
 */
User.beforeCreate(async (user) => {
    if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

/**
 * Intercepte les data avant le PUT
 */
User.beforeUpdate(async (user) => {
    if (user.changed("password")) {
        const salt = await brypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

/**
 * Comparaison methodes
 * @param {*} password
 * @returns
 */
User.prototype.validatPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export default User;
