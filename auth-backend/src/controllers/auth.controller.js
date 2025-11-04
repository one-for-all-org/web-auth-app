import RefreshToken from "../models/refreshToken.modele.js";
import User from "../models/user.model.js";
import {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
} from "../utils/token.js";

/**
 * refresh token
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const refreshToken = async (req, res) => {
    try {
        // lire le refresh token depuis cookie (ou du body si tu préfères)
        const token = req.cookies?.refreshToken || req.body?.refreshToken;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "no refresh token",
            });
        }

        // vérifier présence en DB non révoqué
        const stored = await RefreshToken.findOne({ where: { token } });
        if (!stored || stored.revoked) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token",
            });
        }

        // vérifier signature
        const payload = verifyRefreshToken(token);

        // rotation: crée nouveau refresh token et marque l'ancien comme remplacé
        const newPayload = { id: payload.id, role: payload.role };
        const newAccessToken = signAccessToken(newPayload);
        const newRefreshToken = signRefreshToken(newPayload);

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        // update DB: marquer le token existant comme revoked et stocker replacedByToken
        stored.revoked = true;
        stored.replacedByToken = newRefreshToken;
        await stored.save();

        await RefreshToken.create({
            token: newRefreshToken,
            userId: payload.id,
            expiresAt,
        });

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            accessToken: newAccessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

/**
 * login
 * @param {*} req
 * @param {*} res
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        const isExist = await user.validatPassword(password);
        if (!user || !isExist) {
            res.status(404).json({
                success: false,
                message: "Incorrect email or password!",
            });
        }

        // Crée le payload utilisateur et génère à partir de lui un access token (court terme) et un refresh token (long terme) pour gérer l'authentification sécurisée
        const payload = { id: user.id, role: user.role };
        const accessToken = signAccessToken(payload);
        const refreshToken = signRefreshToken(payload);

        await RefreshToken.create({
            token: refreshToken,
            userId: user.id,
            expireAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        res.status(200).json({
            success: true,
            accessToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const logout = async (req, res) => {
    try {
        const token = req.cookies?.refreshToken || req.body?.refreshToken;
        if (token) {
            const stored = await RefreshToken.findOne({ where: { token } });
            if (stored) {
                stored.revoked = true;
                await stored.save();
            }
        }
        res.clearCookie("refreshToken");
        res.status(200).json({
            success: false,
            message: "logged out",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};
