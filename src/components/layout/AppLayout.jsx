import { Box } from "@mui/material";

export default function AppLayout({ children }) {
    return (
        <Box minHeight="100vh" bgcolor="background.default">
            {children}
        </Box>
    );
}
