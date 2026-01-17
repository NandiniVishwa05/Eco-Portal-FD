import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Typography,
    Stack,
    Pagination,
    Card,
    CardContent,
    Box
} from "@mui/material";
import { useTheme, useMediaQuery, alpha } from "@mui/material";
import { useEffect, useState } from "react";
import InlineLoader from "../../../../components/common/InlineLoader";

const ROWS_PER_PAGE = 10;

export default function ActivitiesTable({
    columns,
    rows,
    emptyMessage,
    loading = false
}) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(1);
    }, [rows]);

    const message =
        emptyMessage || "No activity records available at the moment.";

    if (loading) {
        return (
            <InlineLoader message="Loading activities..." />
        );
    }

    if (!rows || rows.length === 0) {
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
                    {message}
                </Typography>
            </Paper>
        );
    }

    const pageCount = Math.ceil(rows.length / ROWS_PER_PAGE);
    const start = (page - 1) * ROWS_PER_PAGE;
    const end = start + ROWS_PER_PAGE;
    const paginatedRows = rows.slice(start, end);

    /* =======================
       📱 MOBILE CARD VIEW
    ======================= */
    if (isMobile) {
        return (
            <>
                <Stack spacing={2}>
                    {paginatedRows.map((row, index) => (
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
                                    {columns.map(col => (
                                        <Box key={col.key}>
                                            <Typography
                                                fontSize={11}
                                                color="text.secondary"
                                            >
                                                {col.label}
                                            </Typography>
                                            <Typography fontSize={14} fontWeight={600}>
                                                {col.render
                                                    ? col.render(row[col.key], row)
                                                    : row[col.key]}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>

                {pageCount > 1 && (
                    <Stack alignItems="center" sx={{ mt: 3 }}>
                        <Pagination
                            count={pageCount}
                            page={page}
                            onChange={(_, value) => setPage(value)}
                            shape="rounded"
                            size="small"
                        />
                    </Stack>
                )}
            </>
        );
    }

    /* =======================
       🖥️ DESKTOP TABLE VIEW
    ======================= */
    return (
        <Paper
            elevation={0}
            sx={{
                // p: 2.5,
                borderRadius: 3,
                // border: "1px solid",
                // borderColor: "divider",
                // background:
                //     "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,1))"
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
                            {columns.map(col => (
                                <TableCell
                                    key={col.key}
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
                                    {col.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {paginatedRows.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    transition: "0.2s",
                                    "&:hover": {
                                        background: alpha(
                                            theme.palette.primary.main,
                                            0.04
                                        )
                                    },

                                }}
                            >
                                {columns.map(col => (
                                    <TableCell
                                        sx={{
                                            py: "12px !important"
                                        }}
                                        key={col.key}>
                                        {col.render
                                            ? col.render(row[col.key], row)
                                            : row[col.key]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>

            {pageCount > 1 && (
                <Stack alignItems="center" sx={{ mt: 3 }}>
                    <Pagination
                        count={pageCount}
                        page={page}
                        onChange={(_, value) => setPage(value)}
                        shape="rounded"
                        size="small"
                    />
                </Stack>
            )}
        </Paper>
    );
}
