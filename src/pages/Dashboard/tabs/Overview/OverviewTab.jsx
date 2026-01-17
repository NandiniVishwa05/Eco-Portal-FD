import { Box, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { getOverview } from "../../../../services/activityService";
import CategoryTrendsChart from "./CategoryTrendsChart";
import InlineLoader from "../../../../components/common/InlineLoader";

export default function OverviewTab() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOverview = async () => {
            setLoading(true);
            try {
                const res = await getOverview();
                setData(res);
            } catch (err) {
                console.error("Failed to fetch overview", err);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOverview();
    }, []);

    return (
        <Box>
            <Box>
                <Typography fontSize={20} fontWeight={600}>
                    Overview
                </Typography>
                <Typography fontSize={14} color="text.secondary">
                    Overview of user activities.
                </Typography>
            </Box>

            <Paper sx={{ p: 3 }}>
                <Typography
                    fontSize={16}
                    fontWeight={700}
                    sx={{ mb: 2 }}
                >
                    Category Trends
                </Typography>

                {loading ? (
                    <InlineLoader message="Loading Overview..." />
                ) : (
                    <CategoryTrendsChart data={data} />
                )}

                <Typography
                    fontSize={13}
                    color="text.secondary"
                    sx={{ mt: 2 }}
                >
                    Colors correspond to activity categories — see legend.
                </Typography>
            </Paper>
        </Box>
    );
}
