import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import authReducer from "../features/auth/authSlice";
import themeReducer from "../features/auth/themeSlice";

const persistConfig = {
    key: "auth",
    storage
};

const persistedAuthReducer = persistReducer(
    persistConfig,
    authReducer
);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        theme: themeReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export const persistor = persistStore(store);
