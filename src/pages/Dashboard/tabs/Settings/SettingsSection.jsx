import { Box, Typography } from "@mui/material";

export default function SettingsSection({ id, title, description, children }) {
    return (
        <Box id={id} sx={{ scrollMarginTop: 32 }}>
            <Typography fontSize={20} fontWeight={600} sx={{ mb: 0.5 }}>
                {title}
            </Typography>

            {description && (
                <Typography
                    fontSize={14}
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    {description}
                </Typography>
            )}

            {children}
        </Box>
    );
}
