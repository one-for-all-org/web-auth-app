import React, { useEffect, useCallback, useMemo, type ReactNode } from "react";
import type { User } from "../types";
import { AuthContext } from "./AuthContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = React.useState<User | null>(null);
    const navigate = useNavigate();

    // Simule la récupération d'un token ou d'un user stocké
    useEffect(() => {
        const storedUser = localStorage.getItem("auth-user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Make login a void-returning function by running async work inside an IIFE,
    // and stabilize the function reference with useCallback.
    const login = useCallback(
        (userData: User) => {
            (async () => {
                try {
                    setUser(userData);
                    await api.post("/user/auth", userData);
                    console.log(`Authentification success`);
                } catch (error) {
                    console.log("Authentification failed !", error);
                }
            })();
        },
        [setUser, navigate]
    );

    // Stabilize logout reference with useCallback.
    const logout = useCallback(() => {
        const confirmation = globalThis.confirm(
            "Are you sure you want to log out?"
        );
        if (!confirmation) return;
        setUser(null);
    }, [setUser]);

    // Memoize the provider value so it doesn't change each render.
    const value = useMemo(
        () => ({ user, login, logout }),
        [user, login, logout]
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
