import { useParams } from "react-router-dom";
import { DASHBOARD_CONFIG } from "./dashboardConfig";
import TopHeader from "./TopHeader";
import DashboardHeader from "./DashboardHeader";
import DashboardStats from "./DashboardStats";
import DashboardTabs from "./DashboardTabs";
import { Outlet } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import EcoPointsPieChart from "./EcoPointsCylinder";
import { useSelector } from "react-redux";

export default function DashboardShell() {
    const { role } = useParams();
    const config = DASHBOARD_CONFIG[role];
    const theme = useTheme();
    const { user } = useSelector((state) => state.auth);
    if (!config) return null;
    console.log(user);

    return (
        <>
            {/* TOP BANNER */}
            <TopHeader />

            {/* PAGE BACKGROUND */}
            <div
                style={{
                    background: theme.custom.gradients.soft,
                    minHeight: "100vh",
                    paddingBottom: 40
                }}
            >
                {/* CENTERED DASHBOARD CONTAINER */}
                <div
                    style={{
                        maxWidth: 1195,
                        margin: "0 auto",
                        padding: "0 16px"
                    }}
                >
                    {/* WHITE CARD */}
                    <div
                        style={{
                            background: "#ffffff",
                            borderRadius: 16,
                            padding: 14,
                            boxShadow: theme.shadows[1]
                        }}
                    >
                        <DashboardHeader title={config.title} />
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Box>
                                <DashboardStats stats={config.stats} />
                                <DashboardTabs />
                            </Box>
                            <Box>
                                {/* Graph code should be here */}
                                {role === "individual" &&
                                    <EcoPointsPieChart
                                        collected={user.total_ecopoints}
                                        available={user.ecopoints}
                                        used={user.redeemed_ecopoints}
                                    />
                                }
                            </Box>
                        </Box>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}
