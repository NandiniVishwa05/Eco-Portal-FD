import ReactDOM from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { store, persistor } from "./app/store";
import { getAppTheme } from "./theme/theme";
import "leaflet/dist/leaflet.css";

function ThemedApp() {
    const mode = useSelector((state) => state.theme.mode);
    const theme = getAppTheme(mode);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ThemedApp />
        </PersistGate>
    </Provider>
);
