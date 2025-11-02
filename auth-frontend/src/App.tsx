import { ColorModeButton } from "./components/ui/color-mode";
import { useAuth } from "./hooks/useAuth";
import { AppRoutes } from "./routes";
import "./styles/App.css";

function App() {
    const { user } = useAuth();
    return (
        <div className="w-full">
            {!user && (
                <div className="absolute top-2 right-2 z-50">
                    <ColorModeButton />
                </div>
            )}
            <AppRoutes />
        </div>
    );
}

export default App;
