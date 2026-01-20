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

export const getProductCategories = () =>
    api.get('/product/product_categories')

export const getProductTypes = (category) =>
    api.get(`/product/product_lifecycle_templates?category=${category}`)