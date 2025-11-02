import { GrSecure } from "react-icons/gr";
import { useAuth } from "../../../hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";
import { Button } from "@chakra-ui/react";
import { ColorModeButton } from "../../../components/ui/color-mode";

export const NavbarProfile = () => {
    const { user, logout } = useAuth();
    const handleLogOut = () => {
        logout();
    };
    return (
        <nav className="w-full h-10 flex justify-between items-center">
            <div className="w-fit flex h-auto gap-2 items-center">
                <GrSecure size={30} />
                <p className="text-base">Welcome {user?.name}</p>
            </div>
            <div className="w-fit flex h-auto items-center gap-2">
                <FaUserCircle size={30} />
                <ColorModeButton />
                <Button variant="subtle" size="sm" onClick={handleLogOut}>
                    Log out
                </Button>
            </div>
        </nav>
    );
};
