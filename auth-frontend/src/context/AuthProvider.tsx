import React, { useEffect, type ReactNode } from "react";
import type { User } from "../types";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);

    // Simule la récupération d'un token ou d'un user stocké
    useEffect(() => {
        const storedUser = localStorage.getItem("auth-user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem("auth-user", JSON.stringify(userData));
    };

    const logout = () => {
        localStorage.removeItem("auth-user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};