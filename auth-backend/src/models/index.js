import { sequelize } from "../config/connectionDB.js";
import RefreshToken from "./refreshToken.modele.js";
import User from "./user.model.js";

/**
 * Un utilisateur peut avoir plusieurs refresh tokens
 */
User.hasMany(RefreshToken, {
    foreignKey: "userId",
    as: "refreshToken",
    onDelete: "CASCADE",
});

/**
 * Chaque refresh token appartient à un utilisateur
 */
RefreshToken.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});

/**
 * Synchroniser automatiquemment les Modeles : creation automatique des tables
 */
const synchroniseModels = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log("Synchronization successful!");
    } catch (error) {
        console.log(`Error synchronizing models: ${error}`);
    }
};

export { synchroniseModels };
