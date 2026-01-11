import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    userType: null,     // individual | organization | government
    user: null,         // clean user object
    token: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            const { token, message, user_type, ...userData } = action.payload;

            state.isAuthenticated = true;
            state.userType = user_type ?? state.userType;
            state.user = userData;
            state.token = token;
        },

        updateEcoPoints: (state, action) => {
            const { rewardCost } = action.payload;

            if (!state.user) return;

            state.user.ecopoints =
                Math.max(0, state.user.ecopoints - rewardCost);

            state.user.redeemed_ecopoints =
                (state.user.redeemed_ecopoints || 0) + rewardCost;

            state.user.total_ecopoints =
                state.user.ecopoints + state.user.redeemed_ecopoints;
        },

        logout: (state) => {
            state.isAuthenticated = false;
            state.userType = null;
            state.user = null;
            state.token = null;
        }
    }
});

export const { loginSuccess, logout, updateEcoPoints } = authSlice.actions;
export default authSlice.reducer;
