export const mapAvailableCertificates = (data = []) =>
    data.map((c, i) => ({
        id: c._id,
        sr: i + 1,
        name: c.name,
        cost: c.cost,
        description: c.description,
        usage: Array.isArray(c.usage) ? c.usage.join(", ") : c.usage,
        co2: c.co2_savings_required ?? c.co2_savings
    }));

export const mapRedeemedCertificates = (data = []) =>
    data.map((c, i) => ({
        sr: i + 1,
        name: c.name,
        cost: c.cost,
        description: c.description,
        usage: Array.isArray(c.usage) ? c.usage.join(", ") : c.usage,
        co2: c.co2_savings_required ?? "-",
        redeemed_at: c.redeemed_at
    }));
