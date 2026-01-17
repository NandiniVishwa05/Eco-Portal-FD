import { Box, Typography, Switch } from "@mui/material";
import { styled } from "@mui/material/styles";

const EcoSwitch = styled(Switch)(({ theme }) => ({
    width: 42,
    height: 24,
    padding: 0,
    display: "flex",

    "& .MuiSwitch-switchBase": {
        padding: 2,
        transitionDuration: "250ms",

        "&.Mui-checked": {
            transform: "translateX(18px)",
            color: "#fff",

            "& + .MuiSwitch-track": {
                background: theme.custom.gradients.accent,
                opacity: 1,
                border: "none"
            }
        }
    },

    "& .MuiSwitch-thumb": {
        width: 18,
        height: 18,
        borderRadius: 6,
        boxShadow: "none",
        backgroundColor: "#ffffff"
    },

    "& .MuiSwitch-track": {
        borderRadius: 8,
        backgroundColor: "#d8efe8",
        opacity: 1,
        transition: theme.transitions.create(["background-color"], {
            duration: 250
        })
    }
}));

export default function EcoToggle({ label, description }) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 2
            }}
        >
            <Box>
                <Typography fontWeight={600} fontSize={14}>
                    {label}
                </Typography>

                {description && (
                    <Typography
                        fontSize={12.5}
                        color="text.secondary"
                        sx={{ mt: 0.3 }}
                    >
                        {description}
                    </Typography>
                )}
            </Box>

            <EcoSwitch />
        </Box>
    );
}
