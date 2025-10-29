import { ColorModeButton } from "./components/ui/color-mode";
import { AppRoutes } from "./routes";
import "./styles/App.css";

function App() {
    return (
        <>
            <div className="absolute top-2 right-2">
                <ColorModeButton />
            </div>
            <AppRoutes />
        </>
    );
}

export default App;
