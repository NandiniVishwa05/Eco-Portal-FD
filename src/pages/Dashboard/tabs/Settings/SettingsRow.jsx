import { Box, Typography } from "@mui/material";

export default function SettingsRow({ title, subtitle, action }) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            <Box>
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
