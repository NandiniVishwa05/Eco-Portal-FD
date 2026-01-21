import { Box, Typography } from "@mui/material";

export default function SettingsRow({ title, subtitle, action }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                gap: 1
            }}
        >
            <Box
                sx={{
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: 2
                }}
            >
                <Typography fontWeight={600}>{title}</Typography>
                {subtitle && (
                    <Typography fontSize={13} color="text.secondary">
                        {subtitle}
                    </Typography>
                )}
            </Box>

            {action}
        </Box>
    );
}
