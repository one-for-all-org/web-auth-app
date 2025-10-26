import { Route, Routes } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { protectedRoutesListes, publicRoutesListes } from "./routeLists";
import { ProtectedRoute } from "./ProtectedRoute";
import { NotFoundPage } from "../pages/NoteFoundPage";

export const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route element={<PublicRoute />}>
                {publicRoutesListes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                    />
                ))}
            </Route>

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                {protectedRoutesListes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                    />
                ))}
            </Route>

            {/*Not found page */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};
