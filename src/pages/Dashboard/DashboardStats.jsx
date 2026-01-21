import { useSelector } from "react-redux";
import { Stack, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material";

function StatCard({ label, value }) {
    const theme = useTheme();
    return (
        <Paper sx={{
            p: 1.5,
            borderRadius: "12px",
            background: theme.custom.gradients.button,
            minWidth: { xs: "100%", sm: 200 },
            boxShadow: theme.shadows[0]
        }}
        >
            <Typography fontSize={12} color="text.secondary">
                {label}
            </Typography>
            <Typography color="primary.main" fontSize={22} fontWeight={800}>
                {value}
            </Typography>
        </Paper>
    );
}

export default function DashboardStats({ stats }) {
    const { user } = useSelector((state) => state.auth);

    return (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ mb: 1.5 }}
        >
            {stats.includes("co2") && (
                <StatCard
                    label="Total CO₂ Emission"
                    value={`${user?.co2_savings ?? 0} kg`}
                />
            )}

            {stats.includes("ecopoints") && (
                <StatCard
                    label="EcoPoints"
                    value={user?.ecopoints ?? 0}
                />
            )}

            {stats.includes("participants") && (
                <StatCard
                    label="Participants"
                    value={user?.participants ?? 0}
                />
            )}

            {stats.includes("institutions") && (
                <StatCard
                    label="Registered Institutions"
                    value={user?.registered_institutions ?? 0}
                />
            )}
        </Stack>
    );
}
