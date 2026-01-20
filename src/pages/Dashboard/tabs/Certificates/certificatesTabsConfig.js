export const certificatesTabsConfig = {
    individual: {
        type: "user",
        tabs: [
            { key: "available", label: "Available Certificates" },
            { key: "redeemed", label: "Redeemed Certificates" }
        ]
    },

    organization: {
        type: "user",
        tabs: [
            { key: "available", label: "Available Certificates" },
            { key: "redeemed", label: "Redeemed Certificates" }
        ]
    },

    college: {
        type: "user",
        tabs: [
            { key: "available", label: "Available Certificates" },
            { key: "redeemed", label: "Redeemed Certificates" }
        ]
    },

    government: {
        type: "government",
        roles: [
            "individual",
            // "college",
            "manufacturer",
            "retailer",
            "seller",
            // "institution"
        ]
    }
};
