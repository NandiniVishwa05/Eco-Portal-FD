import { NavLink, useParams } from "react-router-dom";
import {
    Stack,
    Typography,
    Drawer,
    IconButton,
    useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { DASHBOARD_CONFIG } from "./dashboardConfig";

export default function Sidebar() {
    const { role } = useParams();
    const config = DASHBOARD_CONFIG[role];
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [open, setOpen] = useState(false);

    if (!config) return null;

    const content = (
        <Stack spacing={2} sx={{ p: 2 }}>
            <Typography fontWeight={800}>
                {config.title}
            </Typography>

            {config.tabs.map((tab) => (
                <NavLink
                    key={tab}
                    to={`/dashboard/${role}/${tab}`}
                    onClick={() => setOpen(false)}
                    style={({ isActive }) => ({
                        padding: "8px 12px",
                        borderRadius: 8,
                        textDecoration: "none",
                        fontWeight: 600,
                        background: isActive ? "#1f8f6a" : "transparent",
                        color: isActive ? "#fff" : "#334155"
                    })}
                >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </NavLink>
            ))}
        </Stack>
    );

    if (isMobile) {
        return (
            <>
                <IconButton
                    onClick={() => setOpen(true)}
                    sx={{ position: "fixed", top: 16, left: 16, zIndex: 1200 }}
                >
                    <MenuIcon />
                </IconButton>

                <Drawer
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    {content}
                </Drawer>
            </>
        );
    }

    return (
        <Stack
            sx={{
                width: 240,
                borderRight: "1px solid #e5e7eb",
                minHeight: "100vh"
            }}
        >
            {content}
        </Stack>
    );
}
