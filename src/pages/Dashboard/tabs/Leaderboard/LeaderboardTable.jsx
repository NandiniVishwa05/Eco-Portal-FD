import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Paper,
    Box
} from "@mui/material";
import { useTheme, alpha } from "@mui/material";
import InlineLoader from "../../../../components/common/InlineLoader";

export default function LeaderboardTable({ data = [], loading }) {
    const theme = useTheme();

    if (loading) {
        return (
            <InlineLoader message="Loading leaderboard..." />
        );
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

    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 3
            }}
        >
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
                                "CO₂ Saved"
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
