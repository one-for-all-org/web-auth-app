import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate("/register");
    };
    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome to the home page!</p>
            <Button variant="outline" size="sm" onClick={navigateToLogin}>
                Get started
            </Button>
        </div>
    );
};
