import { NavLink, useParams } from "react-router-dom";
import { Stack, Button } from "@mui/material";
import { DASHBOARD_CONFIG } from "./dashboardConfig";

export default function DashboardTabs() {
    const { role } = useParams();
    const config = DASHBOARD_CONFIG[role];

    if (!config) return null;

    return (
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            {config.tabs.map(tab => (
                <Button
                    key={tab}
                    component={NavLink}
                    to={`/dashboard/${role}/${tab}`}
                    sx={{
                        textTransform: "capitalize",
                        fontWeight: 700,
                        borderRadius: "20px",
                        padding: "6px 12px",
                        backgroundColor: "#0c32280a",
                        color: "#000",
                        fontSize: 16,
                        lineHeight: 1.5,
                        "&.active": {
                            backgroundColor: "primary.main",
                            color: "#fff"
                        }
                    }}
                >
                    {tab}
                </Button>
            ))}
        </Stack>
    );
}
