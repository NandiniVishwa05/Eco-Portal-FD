import { Button } from "@mui/material";

/* =========================
   COMMON (STATIC) COLUMNS
========================= */
export const COMMON_COLUMNS = {
    sr: { key: "sr", label: "Sr No" },
    name: { key: "name", label: "Name" },
    creator: { key: "creator", label: "Created By" },
    ecopoints: { key: "ecopoints", label: "Ecopoints Cap" },
    co2: { key: "co2", label: "CO₂ Emission" },
    type: { key: "type", label: "Monetary / Non Monetary" },
    description: { key: "description", label: "Benefit Description" },
    quantity: { key: "quantity", label: "Quantity" },
    date: { key: "date", label: "Date" }
};

/* =========================
   COLUMN SETS
========================= */
export const rewardsColumns = {
    /* 🔁 Needs handler → FUNCTION */
    available: (onRedeem) => [
        COMMON_COLUMNS.sr,
        COMMON_COLUMNS.name,
        COMMON_COLUMNS.creator,
        COMMON_COLUMNS.ecopoints,
        COMMON_COLUMNS.co2,
        COMMON_COLUMNS.type,
        COMMON_COLUMNS.description,
        {
            key: "action",
            label: "Action",
            render: (_, row) => (
                <Button
                    size="small"
                    variant="contained"
                    onClick={() => onRedeem(row.id,row.ecopoints)}
                    sx={{
                        borderRadius: "12px",
                        textTransform: "none",
                        padding: "6px 12px",
                        fontWeight: 600,
                        fontSize: 14,
                        
                    }}
                >
                    Redeem
                </Button>
            )
        }
    ],

    /* 📜 STATIC */
    redeemed: [
        COMMON_COLUMNS.sr,
        COMMON_COLUMNS.name,
        COMMON_COLUMNS.creator,
        COMMON_COLUMNS.ecopoints,
        COMMON_COLUMNS.co2,
        COMMON_COLUMNS.type,
        COMMON_COLUMNS.description,
        COMMON_COLUMNS.date
    ],

    /* 🏭 STATIC */
    created_by_self: [
        COMMON_COLUMNS.sr,
        COMMON_COLUMNS.name,
        COMMON_COLUMNS.ecopoints,
        COMMON_COLUMNS.co2,
        COMMON_COLUMNS.type,
        COMMON_COLUMNS.description,
        COMMON_COLUMNS.quantity
    ],

    /* 🏛️ STATIC */
    platform: [
        COMMON_COLUMNS.sr,
        COMMON_COLUMNS.name,
        COMMON_COLUMNS.creator,
        COMMON_COLUMNS.ecopoints,
        COMMON_COLUMNS.co2,
        COMMON_COLUMNS.type,
        COMMON_COLUMNS.description
    ]
};
