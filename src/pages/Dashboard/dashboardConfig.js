export const DASHBOARD_CONFIG = {
    government: {
        title: "Government Dashboard",
        tabs: [
            "heatmap",
            "activities",
            "rewards",
            "overview",
            "leaderboard",
            "analytics",
            "reports",
            "certificates"
        ],
        stats: ["co2", "participants", "institutions"]
    },

    individual: {
        title: "Individual Dashboard",
        tabs: ["heatmap", "activities", "rewards", "reports", "certificates"],
        stats: ["co2", "ecopoints"]
    },

    college: {
        title: "College Dashboard",
        tabs: ["heatmap", "activities", "rewards", "reports", "certificates"],
        stats: ["co2", "ecopoints"]
    },

    organization: {
        title: "Organization Dashboard",
        tabs: ["heatmap", "activities", "rewards", "progress", "reports", "certificates"],
        stats: ["co2", "ecopoints"]
    }
};