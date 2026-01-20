function getEcoPointsFromCO2(totalCO2) {
    if (totalCO2 <= 0.05) return 300;
    if (totalCO2 <= 0.10) return 260;
    if (totalCO2 <= 0.20) return 220;
    if (totalCO2 <= 0.30) return 190;
    if (totalCO2 <= 0.40) return 160;
    if (totalCO2 <= 0.60) return 130;
    if (totalCO2 <= 1.00) return 100;
    if (totalCO2 <= 1.50) return 70;
    if (totalCO2 <= 2.00) return 40;
    if (totalCO2 <= 2.50) return 20;
    if (totalCO2 <= 2.99) return 5;
    return 0; // 3.00 and above
}


export function calculateImpactFromLifecycle(lifecycle) {
    if (!lifecycle) {
        return { co2: 0, ecopoints: 0 };
    }
    console.log(lifecycle);

    const {
        raw_material_weight = 0,
        manufacturing_co2 = 0,
        transport_co2 = 0,
        end_of_life_co2 = 0,
        emission_factor = 0,
        washing_co2 = 0,
        expected_uses = 0,
        is_reusable = "no"
    } = lifecycle;

    // Convert all to numbers safely
    const rawMaterialCO2 = is_reusable == "yes" ? (Number(raw_material_weight) * Number(emission_factor)) / Number(expected_uses) :
        Number(raw_material_weight) * Number(emission_factor);

    const totalCO2 = is_reusable == "yes" ?
        Number(manufacturing_co2) +
        Number(transport_co2) +
        Number(washing_co2) +
        Number(end_of_life_co2) +
        rawMaterialCO2
        :
        Number(manufacturing_co2) +
        Number(transport_co2) +
        Number(end_of_life_co2) +
        rawMaterialCO2;

    // Avoid division by zero
    const ecopoints = getEcoPointsFromCO2(totalCO2);

    return {
        co2: Number(totalCO2.toFixed(2)),
        ecopoints
    };
}
