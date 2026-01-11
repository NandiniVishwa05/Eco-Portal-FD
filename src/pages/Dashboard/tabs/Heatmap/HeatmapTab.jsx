import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import HeatMapMap from "./HeatmapMap";
import {
    fetchHeatmapPoints,
    fetchNearbyOrganizations
} from "../../../../services/mapService";
import HeatmapResultsTable from "./HeatmapResultsTable";

export default function HeatmapTab() {
    const [heatPoints, setHeatPoints] = useState([]);
    const [nearbyOrgs, setNearbyOrgs] = useState([]);
    const [loadingOrgs, setLoadingOrgs] = useState(false);

    useEffect(() => {
        const loadHeatmap = async () => {
            const data = await fetchHeatmapPoints();
            setHeatPoints(
                data.map(item => [item.lat, item.lng, item.weight || 1])
            );
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
            <Box sx={{ mb: 3 }}>
                <Typography fontSize={20} fontWeight={600}>
                    Heatmap
                </Typography>
                <Typography fontSize={14} color="text.secondary">
                    Explore eco-impact hotspots and nearby high-performing organizations.
                </Typography>
            </Box>

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
        </Box>
    );
}
