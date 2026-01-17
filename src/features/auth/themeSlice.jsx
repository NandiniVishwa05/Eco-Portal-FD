import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        mode: "light" // light | dark | system (later)
    },
    reducers: {
        setThemeMode(state, action) {
            state.mode = action.payload;
        }
    }
});

export const { setThemeMode } = themeSlice.actions;
export default themeSlice.reducer;
