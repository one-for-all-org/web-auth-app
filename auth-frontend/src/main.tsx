import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { Provider } from "./components/ui/provider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Provider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </Provider>
        </BrowserRouter>
    </StrictMode>
);
