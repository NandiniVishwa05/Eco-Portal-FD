import { Box, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import Co2SavedChart from "./Co2SavedChart";
import { getActivityAnalytics } from "../../../../services/activityService";

export default function AnalyticsTab() {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadAnalytics = async () => {
            setLoading(true);
            try {
                const data = await getActivityAnalytics();

                // 🔄 Transform backend → chart format
                const formatted = data.map(item => ({
                    label: item.month,
                    value: item.total_co2_savings
                }));

                setChartData(formatted);
            } catch (error) {
                console.error("Failed to load analytics:", error);
            } finally {
                setLoading(false);
            }
        };

        loadAnalytics();
    }, []);

    return (
        <Box>
            {/* HEADER */}
            <Box sx={{ mb: 3 }}>
                <Typography fontSize={20} fontWeight={600}>
                    Analytics
                </Typography>
                <Typography fontSize={14} color="text.secondary">
                    Track environmental impact trends over time.
                </Typography>
            </Box>

            {/* CHART */}
            <Paper sx={{ p: 3 }}>
                <Co2SavedChart data={chartData} loading={loading} />
            </Paper>
        </Box>
    );
}
