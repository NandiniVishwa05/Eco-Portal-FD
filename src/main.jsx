import ReactDOM from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import App from "./App";
import theme from "./theme/theme";
import { store, persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import "leaflet/dist/leaflet.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </PersistGate>
    </Provider>
);
