import { Box, Typography, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function InlineLoader({
    message = "Loading...",
    minHeight = 200
}) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                minHeight,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5
            }}
        >
            <CircularProgress
                size={36}
                thickness={4}
                sx={{
                    color: theme.palette.primary.main
                }}
            />

            <Typography
                fontSize={14}
                color="text.secondary"
            >
                {message}
            </Typography>
        </Box>
    );
}
