export const rewardsTabsConfig = {
    government: {
        showCreate: true,
        tabs: [
            {
                key: "platform_rewards",
                label: "All Rewards",
                type: "platform" // rewards created by all orgs/users
            },
            {
                key: "government_rewards",
                label: "Created Rewards",
                type: "created_by_self"
            }
        ]
    },

    individual: {
        showCreate: false,
        tabs: [
            {
                key: "available",
                label: "Available Rewards",
                type: "available"
            },
            {
                key: "redeemed",
                label: "Redeemed Rewards",
                type: "redeemed"
            }
        ]
    },

    organization: {
        showCreate: true,
        tabs: [
            {
                key: "available",
                label: "Available Rewards",
                type: "available"
            },
            {
                key: "redeemed",
                label: "Redeemed Rewards",
                type: "redeemed"
            },
            {
                key: "created",
                label: "Created Rewards",
                type: "created_by_self"
            }
        ]
    },

    college: {
        showCreate: false,
        tabs: [
            {
                key: "available",
                label: "Available Rewards",
                type: "available"
            },
            {
                key: "redeemed",
                label: "Redeemed Rewards",
                type: "redeemed"
            }
        ]
    }
};
