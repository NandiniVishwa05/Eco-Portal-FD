import { Box, Typography, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function FullScreenLoader({
    open = false,
    message = "Loading, please wait..."
}) {
    const theme = useTheme();

    if (!open) return null;

    return (
        <Box
            sx={{
                position: "fixed",
                inset: 0,
                zIndex: 1300,
                backgroundColor: "rgba(0,0,0,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(4px)"
            }}
        >
            <Box
                sx={{
                    background: theme.custom.gradients.card,
                    px: 5,
                    py: 4,
                    borderRadius: 4,
                    textAlign: "center",
                    boxShadow: theme.shadows[1],
                    minWidth: 280
                }}
            >
                <CircularProgress
                    size={54}
                    thickness={4}
                    sx={{
                        color: theme.palette.primary.main,
                        mb: 2
                    }}
                />

                <Typography
                    fontWeight={600}
                    color="text.primary"
                >
                    {message}
                </Typography>

                <Typography
                    fontSize={13}
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                >
                    EcoPortal is processing your request
                </Typography>
            </Box>
        </Box>
    );
}
