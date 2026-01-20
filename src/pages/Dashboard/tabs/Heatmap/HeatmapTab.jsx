import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import HeatMapMap from "./HeatmapMap";
import {
    fetchHeatmapPoints,
    fetchNearbyOrganizations
} from "../../../../services/mapService";
import HeatmapResultsTable from "./HeatmapResultsTable";
import InlineLoader from "../../../../components/common/InlineLoader";
import EcoAlert from "../../../../components/common/EcoAlertDialog";

export default function HeatmapTab() {
    const [heatPoints, setHeatPoints] = useState([]);
    const [nearbyOrgs, setNearbyOrgs] = useState([]);
    const [loadingOrgs, setLoadingOrgs] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");
    const [alert, setAlert] = useState({
        open: false,
        type: "success",
        message: ""
    });

    useEffect(() => {
        const loadHeatmap = async () => {
            try {
                setLoading(true);
                setLoadingMessage("Loading heatmap data...");
                const data = await fetchHeatmapPoints();
                setHeatPoints(
                    data.map(item => [item.lat, item.lng, item.weight || 1])
                );
            } catch (error) {
                const backendMessage =
                    error?.response?.data?.error ||
                    error?.response?.data?.message ||
                    "Something went wrong. Please try again.";

                setAlert({
                    open: true,
                    type: "error",
                    message: backendMessage
                });
                console.error("Failed to load heatmap data:", error);
            } finally {
                setLoading(false);
            }
        };
        loadHeatmap();
    }, []);

    const handleSelectLocation = async ({ lat, lng }) => {
        setLoadingOrgs(true);
        try {
            const data = await fetchNearbyOrganizations({ lat, lng });
            setNearbyOrgs(data);
        } finally {
            setLoadingOrgs(false);
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
            <Box sx={{ mb: 3 }}>
                <Typography fontSize={20} fontWeight={600}>
                    Heatmap
                </Typography>
                <Typography fontSize={14} color="text.secondary">
                    Explore eco-impact hotspots and nearby high-performing organizations.
                </Typography>
            </Box>
            {loading ?
                <InlineLoader message={loadingMessage} />
                :
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "1.6fr 1fr"
                        },
                        gap: 2
                    }}
                >
                    {/* MAP */}
                    <Paper
                        sx={{
                            height: {
                                xs: 320,
                                sm: 360,
                                md: 420,
                                lg: 450
                            }
                        }}
                    >
                        <HeatMapMap
                            points={heatPoints}
                            onSelectLocation={handleSelectLocation}
                        />
                    </Paper>

                    {/* RESULTS */}
                    <Paper
                        elevation={0}
                        sx={{
                            height: {
                                xs: "auto",
                                md: 420,
                                lg: 450
                            }
                        }}
                    >
                        <HeatmapResultsTable
                            data={nearbyOrgs}
                            loading={loadingOrgs}
                        />
                    </Paper>
                </Box>
            }
        </Box>
    );
}
