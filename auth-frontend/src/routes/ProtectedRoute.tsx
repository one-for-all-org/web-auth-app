import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = () => {
    const { user } = useAuth();

    /**
     * if not authenticated, redirect to login page
     */
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    /**
     * if authenticated, render the child routes
     */
    return <Outlet />;
};
