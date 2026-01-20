import { Snackbar, Alert, Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";

const ALERT_CONFIG = {
    success: {
        icon: <CheckCircleIcon />,
        color: "success",
        title: "Success"
    },
    error: {
        icon: <ErrorIcon />,
        color: "error",
        title: "Error"
    },
    info: {
        icon: <InfoIcon />,
        color: "info",
        title: "Info"
    }
};

export default function EcoAlert({
    open,
    type = "info",
    message,
    title,
    onClose,
    autoHideDuration = 3000,
    anchorOrigin = { vertical: "top", horizontal: "right" }
}) {
    const config = ALERT_CONFIG[type];

    return (
        <Snackbar
            open={open}
            onClose={onClose}
            autoHideDuration={autoHideDuration}
            anchorOrigin={anchorOrigin}
        >
            <Alert
                onClose={onClose}
                severity={config.color}
                icon={config.icon}
                sx={{
                    borderRadius: "14px",
                    px: 2,
                    py: 1.5,
                    minWidth: 300,
                    alignItems: "flex-start",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.15)"
                }}
            >
                <Box>
                    <Typography fontWeight={700} fontSize={15}>
                        {title || config.title}
                    </Typography>
                    <Typography fontSize={14} color="text.secondary">
                        {message}
                    </Typography>
                </Box>
            </Alert>
        </Snackbar>
    );
}
