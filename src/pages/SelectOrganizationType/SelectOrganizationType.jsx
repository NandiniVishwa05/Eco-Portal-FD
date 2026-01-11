import React from "react";
import {
    Box,
    Card,
    Stack,
    Typography,
    ButtonBase,
    Paper,
    IconButton
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const ORG_TYPES = [
    { label: "Manufacturer", value: "manufacturer" },
    { label: "Retailer", value: "retailer" },
    { label: "Seller", value: "seller" },
    { label: "Institution", value: "institution" }
];

const SelectOrganizationType = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="95vh"
            px={2}
            bgcolor="background.default"
        >
            <Card
                sx={{
                    maxWidth: 680,
                    width: "100%",
                    p: { xs: 3, md: 5 },
                    borderRadius: "24px",
                    boxShadow: theme.shadows[1],
                    position: "relative"
                }}
            >
                <Stack spacing={3}>
                    {/* Header */}
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        sx={{ position: "relative" }}
                    >
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                borderRadius: "12px",
                                background: theme.custom.gradients.soft,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 24,
                                boxShadow: theme.shadows[1]
                            }}
                        >
                            🌱
                        </Box>

                        <Box>
                            <Typography
                                fontSize={26}
                                fontWeight={800}
                                color="text.primary"
                            >
                                EcoPortal
                            </Typography>
                            <Typography
                                fontSize={13}
                                fontWeight={600}
                                color="primary.main"
                            >
                                Track CO₂ savings, leaderboards, rewards & live hotspots
                            </Typography>
                        </Box>

                        {/* Back Button */}
                        <IconButton
                            onClick={() => navigate("/")}
                            sx={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                borderRadius: "12px",
                                bgcolor: "background.default",
                                "&:hover": {
                                    bgcolor: theme.palette.primary.light
                                }
                            }}
                        >
                            <ArrowBackRoundedIcon />
                        </IconButton>
                    </Stack>

                    {/* Heading */}
                    <Typography
                        fontSize={18}
                        fontWeight={700}
                        color="text.primary"
                    >
                        Select your organization type
                    </Typography>

                    {/* Organization Options */}
                    <Stack spacing={1.5}>
                        {ORG_TYPES.map(({ label, value }) => (
                            <Paper
                                key={value}
                                component={ButtonBase}
                                onClick={() =>
                                    navigate("/auth/login", {
                                        state: { role: value }
                                    })
                                }
                                sx={{
                                    p: "18px 24px",
                                    borderRadius: "20px",
                                    backgroundColor: "background.default",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: "100%",
                                    transition: "all 0.25s ease",
                                    "&:hover": {
                                        transform: "translateY(-3px)",
                                        backgroundColor: theme.palette.primary.light,
                                        boxShadow: theme.shadows[2]
                                    }
                                }}
                            >
                                <Box textAlign="left">
                                    <Typography
                                        fontSize={17}
                                        fontWeight={800}
                                        color="primary.main"
                                    >
                                        {label}
                                    </Typography>
                                    <Typography
                                        fontSize={11}
                                        fontWeight={600}
                                        color="text.secondary"
                                        sx={{ letterSpacing: 0.5 }}
                                    >
                                        CLICK TO CONTINUE
                                    </Typography>
                                </Box>

                                <Typography
                                    fontSize={22}
                                    fontWeight="bold"
                                    color="primary.main"
                                >
                                    →
                                </Typography>
                            </Paper>
                        ))}
                    </Stack>

                    {/* Tip */}
                    <Typography
                        fontSize={11}
                        color="text.secondary"
                        textAlign="center"
                        sx={{
                            borderTop: `1px solid ${theme.palette.divider}`,
                            pt: 2,
                            mt: 2
                        }}
                    >
                        Tip: Use Government → Analytics → Live Activity Map to see heatmap.
                        Use "Load real dataset" for sample hotspot data.
                    </Typography>
                </Stack>
            </Card>
        </Box>
    );
};

export default SelectOrganizationType;
