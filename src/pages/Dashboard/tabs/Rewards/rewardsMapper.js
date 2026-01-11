export const mapAvailableRewards = (data) =>
    data.map((item, index) => ({
        id: item._id,
        sr: index + 1,
        name: item.name,
        creator: item.organization_name || "Government",
        ecopoints: item.ecopoints_required,
        co2: item.co2_savings,
        type: item.is_monetary ? "Monetary" : "Non-Monetary",
        description: item.description,
        quantity: item.quantity
    }));

export const mapRedeemedRewards = (data) =>
    data.map((item, index) => ({
        sr: index + 1,
        name: item.reward_name,
        creator: item.is_government_reward ? "Government" : "Organization",
        ecopoints: item.ecopoints_used,
        co2: item.co2_savings,
        type: item.is_monetary ? "Monetary" : "Non-Monetary",
        description: item.reward_description,
        date: new Date(item.redeemed_at).toLocaleDateString()
    }));

export const mapCreatedRewards = (data) =>
    data.map((item, index) => ({
        sr: index + 1,
        name: item.name,
        ecopoints: item.ecopoints_required,
        co2: item.co2_savings,
        type: item.is_monetary ? "Monetary" : "Non-Monetary",
        description: item.description,
        quantity: item.quantity
    }));
