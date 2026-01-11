export const AUTH_CONFIG = {
    government: {
        role: "government",
        identifierLabel: "State Code",
        identifierType: "text",
        allowSignup: false,
        dashboard: "/dashboard/government"
    },

    individual: {
        role: "individual",
        identifierLabel: "Aadhaar ID",
        identifierType: "number",
        allowSignup: true,
        dashboard: "/dashboard/individual"
    },

    manufacturer: {
        role: "manufacturer",
        identifierLabel: "GSTIN Number",
        identifierType: "text",
        allowSignup: true,
        dashboard: "/dashboard/organization"
    },

    retailer: {
        role: "retailer",
        identifierLabel: "GSTIN Number",
        identifierType: "text",
        allowSignup: true,
        dashboard: "/dashboard/organization"
    },

    institution: {
        role: "institution",
        identifierLabel: "GSTIN Number",
        identifierType: "text",
        allowSignup: true,
        dashboard: "/dashboard/organization"
    },

    seller: {
        role: "seller",
        identifierLabel: "Email Address",
        identifierType: "email",
        allowSignup: true,
        dashboard: "/dashboard/seller"
    },

    college: {
        role: "college",
        identifierLabel: "GSTIN Number",
        identifierType: "text",
        allowSignup: true,
        dashboard: "/dashboard/college"
    }
};
