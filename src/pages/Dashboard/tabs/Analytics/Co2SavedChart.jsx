import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import { Box, Typography } from "@mui/material";

export default function Co2SavedChart({ data = [], loading }) {
    if (loading) {
        return <Typography>Loading analytics...</Typography>;
    }

    if (!data.length) {
        return (
            <Typography color="text.secondary">
                No analytics data available.
            </Typography>
        );
    }

    return (
        <Box sx={{ width: "48%", height: 300 }}>
            <ResponsiveContainer>
                <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="label"
                        tickMargin={8}
                    />

                    <YAxis
                        domain={[0, "dataMax + 5"]}
                        tickMargin={8}
                    />

                    <Tooltip />
                    <Legend />

                    <Area
                        type="monotone"
                        dataKey="value"
                        name="CO₂ Saved (kg)"
                        stroke="#0f766e"
                        fill="#99f6e4"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </Box>
    );
}
