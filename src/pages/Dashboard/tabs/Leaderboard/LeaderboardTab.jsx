import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import LeaderboardTable from "./LeaderboardTable";
import { fetchLeaderboardService } from "../../../../services/leaderboardService";

export default function LeaderboardTab() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadLeaderboard = async () => {
            setLoading(true);
            try {
                const leaderboard = await fetchLeaderboardService();
                setData(leaderboard);
            } catch (error) {
                console.error("Failed to fetch leaderboard:", error);
            } finally {
                setLoading(false);
            }
        };

        loadLeaderboard();
    }, []);

    return (
        <Box>
            {/* 🔹 TAB HEADER */}
            <Box sx={{ mb: 3 }}>
                <Typography fontSize={20} fontWeight={600}>
                    Leaderboard
                </Typography>
                <Typography fontSize={14} color="text.secondary">
                    View top-performing organizations and individuals based on eco-impact.
                </Typography>
            </Box>

            {/* 🔹 TAB CONTENT */}
            <LeaderboardTable data={data} loading={loading} />
        </Box>
    );
}
