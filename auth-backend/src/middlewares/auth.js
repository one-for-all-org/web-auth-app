import { User } from "../models";
import { verifyAccessToken } from "../utils/token";

export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "No token provide",
            });
        }

        const parts = authHeader.split(" ");
        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }

        const token = parts[1];

        const payload = verifyAccessToken(token);
        const user = User.findByPk(payload.id, {
            attributes: ["id", "name", "email", "role"],
        });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user not found!",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error!",
            error: error.message,
        });
    }
};

// middleware pour roles
export const authorize =
    (...allowedRoles) =>
    (req, res, next) => {
        if (!req.user)
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized" });
        if (!allowedRoles.includes(req.user.role))
            return res
                .status(403)
                .json({ success: false, message: "Forbidden" });
        next();
    };
