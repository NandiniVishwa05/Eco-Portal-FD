import api from "./apiClient";

export const createProduct = (formData) =>
    api.post("/product/create", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
