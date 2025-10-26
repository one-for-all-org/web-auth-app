import { Button } from "@chakra-ui/react";
import { useAuth } from "../hooks/useAuth";

export const ProfilePage = () => {
    const { user, logout } = useAuth();
    const handleLogOut = () => {
        logout();
    };
    return (
        <div className="w-full h-screen flex justify-center items-center gap-4 px-2">
            <div>
                Profile Page, welcome{" "}
                <p className="text-xl font-bold text-blue-500">{user?.name}</p>
                <p className="text-green-400">{user?.email}</p>
                <p className="text-orange-500">{user?.role}</p>
            </div>
            <Button
                size="sm"
                variant="solid"
                rounded="lg"
                onClick={handleLogOut}
            >
                Log out
            </Button>
        </div>
    );
};
