import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Paper,
    Box,
    Card,
    CardContent,
    Stack,
    useMediaQuery
} from "@mui/material";
import { useTheme, alpha } from "@mui/material";
import InlineLoader from "../../../../components/common/InlineLoader";

export default function LeaderboardTable({ data = [], loading }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    if (loading) {
        return <InlineLoader message="Loading leaderboard..." />;
    }

    if (!data.length) {
        return (
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider"
                }}
            >
                <Typography color="text.secondary">
                    No leaderboard data available.
                </Typography>
            </Paper>
        );
    }

    /* =======================
       📱 MOBILE CARD VIEW
    ======================= */
    if (isMobile) {
        return (
            <Stack spacing={2}>
                {data.map((row, index) => (
                    <Card
                        key={index}
                        elevation={0}
                        sx={{
                            borderRadius: 2.5,
                            border: "1px solid",
                            borderColor: "divider",
                            transition: "0.25s",
                            "&:hover": {
                                boxShadow: theme.shadows[2]
                            }
                        }}
                    >
                        <CardContent sx={{ pb: "16px !important" }}>
                            <Stack spacing={0.8}>
                                <Box>
                                    <Typography fontSize={11} color="text.secondary">
                                        Rank
                                    </Typography>
                                    <Typography fontWeight={600}>
                                        #{index + 1}
                                    </Typography>
                                </Box>

                                <Box>
                                    <Typography fontSize={11} color="text.secondary">
                                        Name
                                    </Typography>
                                    <Typography fontWeight={600}>
                                        {row.name}
                                    </Typography>
                                </Box>

                                <Box>
                                    <Typography fontSize={11} color="text.secondary">
                                        Category
                                    </Typography>
                                    <Typography>
                                        {row.organization_type}
                                    </Typography>
                                </Box>

                                <Box>
                                    <Typography fontSize={11} color="text.secondary">
                                        EcoPoints
                                    </Typography>
                                    <Typography fontWeight={600}>
                                        {row.ecopoints}
                                    </Typography>
                                </Box>

                                <Box>
                                    <Typography fontSize={11} color="text.secondary">
                                        CO₂ Emission
                                    </Typography>
                                    <Typography>
                                        {row.co2_savings} kg
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        );
    }

    /* =======================
       🖥️ DESKTOP TABLE VIEW
    ======================= */
    return (
        <Paper elevation={0} sx={{ borderRadius: 3 }}>
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
                            {[
                                "Rank",
                                "Name",
                                "Category",
                                "EcoPoints",
                                "CO₂ Emission"
                            ].map(label => (
                                <TableCell
                                    key={label}
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: 16,
                                        py: "12px !important",
                                        color: theme.palette.background.paper,
                                        background: alpha(
                                            theme.palette.primary.main,
                                            1
                                        )
                                    }}
                                >
                                    {label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow
                                key={index}
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
                                <TableCell sx={{ py: "12px !important" }}>
                                    {index + 1}
                                </TableCell>
                                <TableCell sx={{ py: "12px !important", fontWeight: 600 }}>
                                    {row.name}
                                </TableCell>
                                <TableCell sx={{ py: "12px !important" }}>
                                    {row.organization_type}
                                </TableCell>
                                <TableCell sx={{ py: "12px !important" }}>
                                    {row.ecopoints}
                                </TableCell>
                                <TableCell sx={{ py: "12px !important" }}>
                                    {row.co2_savings} kg
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Paper>
    );
}
