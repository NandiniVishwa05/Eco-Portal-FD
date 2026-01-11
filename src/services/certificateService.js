import api from "./apiClient";

/**
 * Non-government users
 */
export const getAvailableCertificates = async () => {
    const res = await api.get("/certificate/get_available_certificates");
    return res.data.data; // array of certificates
};

export const getRedeemedCertificates = async () => {
    const res = await api.get("/certificate/get_redeemed_certificates");
    return res.data.data; // array of redeemed certificates
};

export const redeemCertificate = async (id) => {
    const res = await api.get(`/certificate/redeem_certificate/${id}`);
    return res.data;
};

/**
 * Government users
 * Returns:
 * {
 *   individual: [...],
 *   college: [...],
 *   seller: [...],
 *   manufacturer: [...],
 *   retailer: [...],
 *   institution: [...]
 * }
 */
export const getGovernmentAvailableCertificates = async () => {
    const res = await api.get("/certificate/get_available_certificates");

    const grouped = {
        individual: [],
        college: [],
        seller: [],
        manufacturer: [],
        retailer: [],
        institution: []
    };

    res.data.data.forEach(group => {
        grouped[group.eligible_user_type] = group.certificates || [];
    });

    return grouped;
};
