import jwt from "jsonwebtoken";
import {
    ACCESS_TOKEN_EXPIRES_IN,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_SECRET,
} from "../config/jwt";

/**
 * Génère un token d’accès à courte durée (ex: 30min)
 * @param {*} payload
 * @returns
 */
export function signAccessToken(payload) {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
        algorithm: "HS256",
    });
}

/**
 * Génère un token de rafraîchissement à longue durée (ex: 7j)
 * @param {*} payload
 * @returns
 */
export function signRefreshToken(payload) {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
        algorithm: "HS256",
    });
}

/**
 * Vérifie la validité du token d’accès
 * @param {*} token
 * @returns
 */
export function verifyAccessToken(token) {
    return jwt.verify(token, ACCESS_TOKEN_SECRET, { algorithms: ["HS256"] });
}

/**
 * Vérifie la validité du token de rafraîchissement
 * @param {*} token
 * @returns
 */
export function verifyRefreshToken(token) {
    return jwt.verify(token, REFRESH_TOKEN_SECRET, { algorithms: ["HS256"] });
}
