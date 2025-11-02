import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const PublicRoute = () => {
    const { user } = useAuth();

    /**
     * if authenticated, redirect to home page
     */
    if (user) {
        return <Navigate to="/profile" replace />;
    }

    /**
     * if not authenticated, render the child routes
     */
    return <Outlet />;
};
