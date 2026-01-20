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
import img from "../../assets/avani_logo.png";

const ORG_TYPES = [
    {
        label: "Manufacturer",
        value: "manufacturer",
        helper: "You manufacture your own products"
    },
    {
        label: "Retailer",
        value: "retailer",
        helper: "You sell products manufactured by others"
    },
    {
        label: "Other",
        value: "seller",
        helper: "Institutions, enterprises, IT companies, etc."
    }
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
                                width: 69,
                                height: 54,
                                borderRadius: "12px",      // ✅ old value
                                background: theme.custom.gradients.soft,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 24,
                                boxShadow: theme.shadows[1]
                            }}
                        >
                            <img src={img} alt="AVANI-C" />
                        </Box>

                        <Box>
                            <Typography
                                fontSize={26}
                                fontWeight={800}
                                color="text.primary"
                            >
                                AVANI-C
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
                                    bgcolor: theme.palette.hover.main
                                }
                            }}
                        >
                            <ArrowBackRoundedIcon />
                        </IconButton>
                    </Stack>

                    {/* Heading */}
                    <Box>

                        <Typography
                            fontSize={18}
                            fontWeight={700}
                            color="text.primary"
                        >
                            Select your organization type
                        </Typography>

                        <Typography
                            fontSize={12}
                            color="text.secondary"
                        >
                            Choose the option that best describes your role. This helps us personalize
                            dashboards, eco-points, and CO₂ impact calculations for your account.
                        </Typography>
                    </Box>

                    {/* Organization Options */}
                    <Stack spacing={1.5}>
                        {ORG_TYPES.map(({ label, value, helper }) => (
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
                                        backgroundColor: theme.palette.hover.main,
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
                                        fontSize={12}
                                        color="text.secondary"
                                    // sx={{ mt: 0.3 }}
                                    >
                                        {helper}
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
