import React, { useEffect, type ReactNode } from "react";
import type { User } from "../types";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = React.useState<User | null>(null);

    // Simule la récupération d'un token ou d'un user stocké
    useEffect(() => {
        const storedUser = localStorage.getItem("auth-user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem("auth-user", JSON.stringify(userData));
    };

    const register = (userData: User) => {
        login(userData);
        console.log("User registered:", userData);
    };

    const logout = () => {
        const confirmation = window.confirm(
            "Are you sure you want to log out?"
        );
        if (!confirmation) return;

        localStorage.removeItem("auth-user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
