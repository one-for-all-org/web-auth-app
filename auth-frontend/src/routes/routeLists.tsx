import {
    HomePage,
    LoginPage,
    ProfilePage,
    RegisterPage,
} from "../pages";
import { NotFoundPage } from "../pages/NoteFoundPage";

export const publicRoutesListes = [
    { path: "/", element: <HomePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "*", element: <NotFoundPage /> },
];

export const protectedRoutesListes = [
    { path: "/profile", element: <ProfilePage /> },
];
