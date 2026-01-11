import { Box, Typography, Stack } from "@mui/material";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip
} from "recharts";

export default function EcoPointsPieChart({
    collected,
    available,
    used
}) {
    const data = [
        { name: "Used", value: used, color: "#2563eb" },
        { name: "Available", value: available, color: "#16a34a" },
        { name: "Collected", value: collected, color: "#ea580c" }
    ];

    const total = collected + available + used;

    return (
        <Box
            sx={{
                minWidth: 360,
                // p: 2,
                borderRadius: 3,
                // background: "#f9fafb",
                boxShadow: "none"
            }}
        >
            {/* Title */}
            {/* <Typography fontWeight={600} mb={1}>
                EcoPoints Overview
            </Typography> */}

            {/* CHART + RIGHT LEGEND */}
            <Stack direction="row" spacing={2} alignItems="center">
                {/* PIE */}
                <Box sx={{ width: 150, height: 150 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={75}
                                paddingAngle={3}
                                isAnimationActive
                            >
                                {data.map((entry) => (
                                    <Cell key={entry.name} fill={entry.color} />
                                ))}
                            </Pie>

                            {/* CENTER TEXT */}
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize="14"
                                fontWeight="600"
                                fill="#374151"
                            >
                                Ecometer
                            </text>

                            <Tooltip
                                formatter={(value, name) => [
                                    `${value} (${((value / total) * 100).toFixed(1)}%)`,
                                    name
                                ]}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </Box>

                {/* RIGHT SIDE LEGEND */}
                <Stack spacing={1.2}>
                    <Legend color="#2563eb" label={`Used (${used})`} />
                    <Legend color="#16a34a" label={`Available (${available})`} />
                    <Legend color="#ea580c" label={`Collected (${collected})`} />
                </Stack>
            </Stack>
        </Box>
    );
}

function Legend({ color, label }) {
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Box
                sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: color
                }}
            />
            <Typography fontSize={13}>{label}</Typography>
        </Stack>
    );
}
