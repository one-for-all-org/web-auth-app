import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate("/register");
    };
    return (
        <div className="w-full h-screen flex justify-center items-center px-2">
            <div className="flex flex-col gap-2">
                <p>Welcome to the home page!</p>
                <Button variant="outline" size="sm" onClick={navigateToLogin}>
                    Get started
                </Button>
            </div>
        </div>
    );
};
