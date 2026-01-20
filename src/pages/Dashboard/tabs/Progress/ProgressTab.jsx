import { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { getProgressData } from "../../../../services/progressService";
import ProgressChart from "./ProgressChart";
import InlineLoader from "../../../../components/common/InlineLoader";
import EcoAlert from "../../../../components/common/EcoAlertDialog";

export default function ProgressTab() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        open: false,
        type: "success",
        message: ""
    });

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
            const backendMessage =
                err?.response?.data?.error ||
                err?.response?.data?.message ||
                "Something went wrong. Please try again.";

            setAlert({
                open: true,
                type: "error",
                message: backendMessage
            });
            console.error("Failed to load progress", err);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <EcoAlert
                open={alert.open}
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert({ ...alert, open: false })}
            />
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
                    <InlineLoader message="Loading Progress..." />
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
