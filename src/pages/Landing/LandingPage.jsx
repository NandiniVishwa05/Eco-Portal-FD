import React from "react";
import {
    Box,
    Card,
    Stack,
    Typography,
    ButtonBase,
    Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import img from "../../assets/avani_logo.png";

const ROLES = [
    { label: "Government", value: "government", route: "/auth/login" },
    { label: "Individual", value: "individual", route: "/auth/login" },
    { label: "Organization", value: "organization", route: "/select-organization" },
    // { label: "College", value: "college", route: "/auth/login" }
];

const LandingPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    const handleRoleClick = (role) => {
        navigate(role.route, {
            state: role.value !== "organization" ? { role: role.value } : null
        });
    };

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
                    borderRadius: "24px",          // ✅ old value
                    boxShadow: theme.shadows[1]
                }}
            >
                <Stack spacing={3}>
                    {/* Header */}
                    <Stack direction="row" spacing={2} alignItems="center">
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
                    </Stack>

                    {/* Heading */}
                    <Typography
                        fontSize={18}
                        fontWeight={700}
                        color="text.primary"
                    >
                        Select your role
                    </Typography>

                    {/* Roles */}
                    <Stack spacing={1.5}>
                        {ROLES.map((role) => (
                            <Paper
                                key={role.value}
                                component={ButtonBase}
                                onClick={() => handleRoleClick(role)}
                                sx={{
                                    p: "18px 24px",
                                    borderRadius: "20px",     // ✅ old value
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
                                        {role.label}
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

export default LandingPage;
