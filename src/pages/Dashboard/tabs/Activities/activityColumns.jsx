import { Chip } from "@mui/material";

export const COMMON_RENDERERS = {
    ecopoints: (v) => <strong>{v}</strong>,
    co2: (v) => <span style={{ color: "#0ea5a4" }}>{v} kg</span>,
};

const renderCategory = (value) => (
    <Chip
        label={value}
        size="small"
        sx={{
            fontWeight: 600,
            backgroundColor: "#e6f7f2",
            color: "#0f7b6b"
        }}
    />
);

export const GOVERNMENT_COLUMNS = [
    { key: "sr", label: "Sr No" },
    { key: "buyer", label: "Buyer" },
    { key: "product", label: "Product" },
    { key: "category", label: "Category", render: renderCategory },
    { key: "seller", label: "Seller" },
    { key: "ecopoints", label: "EcoPoints", render: COMMON_RENDERERS.ecopoints },
    { key: "co2", label: "CO₂ Saved", render: COMMON_RENDERERS.co2 },
    { key: "date", label: "Date" }
];

export const INDIVIDUAL_COLUMNS = [
    { key: "sr", label: "Sr No" },
    { key: "product", label: "Product" },
    { key: "category", label: "Category", render: renderCategory },
    { key: "seller", label: "Seller" },
    { key: "ecopoints", label: "EcoPoints", render: COMMON_RENDERERS.ecopoints },
    { key: "co2", label: "CO₂ Saved", render: COMMON_RENDERERS.co2 },
    { key: "date", label: "Date" }
];

export const SELLING_COLUMNS = [
    { key: "sr", label: "Sr No" },
    { key: "product", label: "Product" },
    { key: "category", label: "Category", render: renderCategory },
    { key: "buyer", label: "Buyer" },
    { key: "ecopoints", label: "EcoPoints", render: COMMON_RENDERERS.ecopoints },
    { key: "co2", label: "CO₂ Saved", render: COMMON_RENDERERS.co2 },
    { key: "date", label: "Date" }
];
