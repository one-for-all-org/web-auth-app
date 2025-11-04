import { DataTypes, Model, UUIDV4 } from "sequelize";
import { sequelize } from "../config/connectionDB.js";

class RefreshToken extends Model {}

RefreshToken.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        revoked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        replacedByToken: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "RefreshToken",
        tableName: "refresh_tokens",
        timestamps: true,
    }
);

export default RefreshToken;
