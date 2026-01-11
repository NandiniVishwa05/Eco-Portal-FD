import { Button } from "@mui/material";

export const COMMON_COLUMNS = {
    sr: { key: "sr", label: "Sr No" },
    name: { key: "name", label: "Name" },
    cost: { key: "cost", label: "Cost" },
    description: { key: "description", label: "Description" },
    usage: { key: "usage", label: "Usage" },
    co2: { key: "co2", label: "CO₂ Savings Cap" }
};

export const certificatesColumns = {
    available: (onRedeem) => [
        COMMON_COLUMNS.sr,
        COMMON_COLUMNS.name,
        COMMON_COLUMNS.cost,
        COMMON_COLUMNS.description,
        COMMON_COLUMNS.usage,
        COMMON_COLUMNS.co2,
        {
            key: "action",
            label: "Action",
            render: (_, row) => (
                <Button
                    size="small"
                    variant="contained"
                    onClick={() => onRedeem(row)}
                    sx={{
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: 600,
                        backgroundColor: 'primary.main',
                        '&:hover': {
                            backgroundColor: 'primary.dark'
                        }
                    }}
                >
                    Redeem
                </Button>
            )
        }
    ],

    redeemed: [
        COMMON_COLUMNS.sr,
        COMMON_COLUMNS.name,
        COMMON_COLUMNS.cost,
        COMMON_COLUMNS.description,
        COMMON_COLUMNS.usage,
        COMMON_COLUMNS.co2
    ],

    government: [
        COMMON_COLUMNS.sr,
        COMMON_COLUMNS.name,
        COMMON_COLUMNS.cost,
        COMMON_COLUMNS.description,
        COMMON_COLUMNS.usage,
        COMMON_COLUMNS.co2
    ]
};