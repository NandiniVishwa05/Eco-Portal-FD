export const mapBuyerActivities = (data) =>
    data.map((item, index) => ({
        sr: index + 1,
        category: item.product.impact_category,
        product: item.product.name,
        seller: item.seller_name,
        ecopoints: item.product.ecopoints,
        co2: item.product.co2_savings,
        date: new Date(item.createdAt).toLocaleDateString()
    }));

export const mapSellerActivities = (data) =>
    data.map((item, index) => ({
        sr: index + 1,
        category: item.product.impact_category,
        product: item.product.name,
        buyer: item.buyer_name,
        ecopoints: item.product.ecopoints,
        co2: item.product.co2_savings,
        date: new Date(item.createdAt).toLocaleDateString()
    }));

export const mapGovernmentActivities = (data) =>
    data.map((item, index) => ({
        sr: index + 1,
        category: item.product.impact_category,
        buyer: item.buyer_name,
        product: item.product.name,
        seller: item.seller_name,
        ecopoints: item.product.ecopoints,
        co2: item.product.co2_savings,
        date: new Date(item.createdAt).toLocaleDateString()
    }));
