import api from "./apiClient";

export const createProduct = (formData) =>
    api.post("/product/create", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

export const scanProduct = (formData) =>
    api.post("/product/redeem", formData);

export const getProductById = (id) =>
    api.get(`/product/${id}`);

export const getRecommendedProducts = (id) =>
    api.get(`/product/recommend/${id}`);
