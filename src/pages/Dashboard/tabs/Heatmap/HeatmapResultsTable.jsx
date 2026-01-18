import {
    Paper,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Stack,
    Pagination,
    Box,
    Chip,
    useMediaQuery,
    alpha
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";

const PAGE_SIZE = 3;

export default function HeatmapResultsTable({ data = [], loading }) {
    const [page, setPage] = useState(1);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        setPage(1);
    }, [data]);

    if (loading) {
        return (
            <Paper
                sx={{
                    p: 3,
                    borderRadius: 3,
                    background: alpha(theme.palette.background.paper, 0.7)
                }}
            >
                <Typography fontWeight={600}>
                    Loading nearby organizations…
                </Typography>
            </Paper>
        );
    }

    if (!data.length) {
        return (
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
                <Typography color="text.secondary">
                    Click on a hotspot to view nearby organizations.
                </Typography>
            </Paper>
        );
    }

    const start = (page - 1) * PAGE_SIZE;
    const paginated = data.slice(start, start + PAGE_SIZE);
    const totalPages = Math.ceil(data.length / PAGE_SIZE);

    return (
        <Paper
            elevation={0}
            sx={{
                // p: 2.5,
                height: "100%",
                borderRadius: 3,
                boxShadow: theme.shadows[0],

                // border: "1px solid",
                // borderColor: "divider",
                // background:
                //     "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.95))"
            }}
        >
            {/* <Typography
                fontWeight={800}
                sx={{ mb: 2, fontSize: 18 }}
            >
                Nearby Organizations
            </Typography> */}

            {/* 📱 MOBILE VIEW */}
            {isMobile ? (
                <Stack spacing={2}>
                    {paginated.map((row, i) => (
                        <Box
                            key={i}
                            sx={{
                                p: 2,
                                borderRadius: 2.5,
                                border: "1px solid",
                                borderColor: "divider",
                                background: "#fff",
                                transition: "0.25s",
                                "&:hover": {
                                    boxShadow: theme.shadows[3]
                                }
                            }}
                        >
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Typography fontWeight={700}>
                                    {row.name}
                                </Typography>
                                <Chip
                                    size="small"
                                    label={row.organization_type}
                                    sx={{
                                        fontSize: 11,
                                        height: 22
                                    }}
                                />
                            </Stack>

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                sx={{ mt: 1.5 }}
                            >
                                <Metric label="CO₂ Emission" value={`${row.co2_savings} kg`} />
                                <Metric label="EcoPoints" value={row.ecopoints} />
                                <Metric label="Distance" value={`${row.distance_in_km} km`} />
                            </Stack>
                        </Box>
                    ))}
                </Stack>
            ) : (
                /* 💻 DESKTOP TABLE */
                <Box
                    sx={{
                        overflow: "hidden",
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "divider"
                    }}
                >
                    <Table stickyHeader size="small">
                        <TableHead>
                            <TableRow>
                                {["#", "Organization", "CO₂ Emission", "EcoPoints", "Distance"].map(
                                    (h) => (
                                        <TableCell
                                            key={h}
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: 14,
                                                color: theme.palette.background.paper,
                                                background: alpha(
                                                    theme.palette.primary.main,
                                                    1
                                                )
                                            }}
                                        >
                                            {h}
                                        </TableCell>
                                    )
                                )}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {paginated.map((row, i) => (
                                <TableRow
                                    key={i}
                                    sx={{
                                        transition: "0.2s",
                                        "&:hover": {
                                            background: alpha(
                                                theme.palette.primary.main,
                                                0.04
                                            )
                                        }
                                    }}
                                >
                                    <TableCell>{start + i + 1}</TableCell>

                                    <TableCell>
                                        <Typography
                                            fontSize={14}
                                            fontWeight={600}>
                                            {row.name}
                                        </Typography>
                                        <Typography
                                            fontSize={11}
                                            color="text.secondary"
                                        >
                                            {row.organization_type}
                                        </Typography>
                                    </TableCell>

                                    <TableCell fontSize={12}>{row.co2_savings} kg</TableCell>
                                    <TableCell fontSize={12}>{row.ecopoints}</TableCell>
                                    <TableCell fontSize={12}>{row.distance_in_km} km</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            )}

            {totalPages > 1 && (
                <Stack alignItems="center" sx={{ mt: 2 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_, v) => setPage(v)}
                        shape="rounded"
                        size="small"
                        sx={{
                            "& .Mui-selected": {
                                fontWeight: 700
                            }
                        }}
                    />
                </Stack>
            )}
        </Paper>
    );
}

/* 🔹 Small reusable metric block */
function Metric({ label, value }) {
    return (
        <Box>
            <Typography fontSize={11} color="text.secondary">
                {label}
            </Typography>
            <Typography fontWeight={700} fontSize={13}>
                {value}
            </Typography>
        </Box>
    );
}
