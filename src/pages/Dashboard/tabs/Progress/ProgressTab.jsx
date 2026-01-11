import { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { getProgressData } from "../../../../services/progressService";
import ProgressChart from "./ProgressChart";

export default function ProgressTab() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProgress();
    }, []);

    const fetchProgress = async () => {
        setLoading(true);
        try {
            const raw = await getProgressData();

            // Map backend → chart format
            const mapped = raw.map((item, index) => ({
                week: `W${index + 1}`,
                ecopoints: item.totalEcopoints
            }));

            setData(mapped);
        } catch (err) {
            console.error("Failed to load progress", err);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            {/* PAGE HEADER */}
            <Box sx={{ mb: 3 }}>
                <Typography fontSize={20} fontWeight={600}>
                    Progress
                </Typography>
                <Typography fontSize={14} color="text.secondary">
                    Track your EcoPoints growth over recent weeks.
                </Typography>
            </Box>

            <Paper elevation={0} >
                {loading ? (
                    <Typography align="center">Loading progress...</Typography>
                ) : data.length === 0 ? (
                    <Typography align="center" color="text.secondary">
                        No progress data available yet.
                    </Typography>
                ) : (
                    <ProgressChart data={data} />
                )}
            </Paper>
        </Box>
    );
}
