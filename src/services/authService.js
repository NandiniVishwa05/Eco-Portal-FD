import api from "./apiClient";
import { AUTH } from "./endpoints";

/**
 * Signup API
 */
export const signup = async (payload) => {
    const response = await api.post(AUTH.SIGNUP, payload);
    return response.data;
};

/**
 * Login API
 */
export const login = async (payload) => {
    const response = await api.post(AUTH.SIGNIN, payload);
    console.log("control cont");
    
    return response.data;
};

/**
 * Get logged-in user
 */
export const getUserInfo = async () => {
    const response = await api.get("/auth/user-info");
    return response.data.data;
};

export const sendResetOtp = (payload) =>
    api.post("/auth/forgotpassword", payload);

export const verifyOtp = (payload) =>
    api.post("/auth/verifyotp", payload);

export const resetPassword = (payload) =>
    api.post("/auth/resetpassword", payload);

export const logout = () => api.post("/auth/logout");