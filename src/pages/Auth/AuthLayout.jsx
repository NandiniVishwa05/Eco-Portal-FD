import { Box, Stack, Typography, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate } from "react-router-dom";
import img from "../../assets/avani_logo.png";
export default function AuthLayout({
    roleLabel,
    roleDescription,
    children,
    showBack = false
}) {
    const navigate = useNavigate();

    return (
        <Box minHeight="100vh" display="flex" bgcolor="#f0fdf4">
            {/* LEFT PANEL */}
            <Box
                sx={{
                    flex: 1,
                    display: { xs: "none", md: "flex" },
                    flexDirection: "column",
                    justifyContent: "center",
                    px: 8,
                    background:
                        "linear-gradient(180deg, #ecfdf5 0%, #d1fae5 100%)"
                }}
            >
                <Stack spacing={4} maxWidth={520}>
                    {/* Brand */}
                    <Box display="flex" alignItems="center">
                        <img src={img} alt="" style={{ width: 95, height: 70 }} />
                        <Typography
                            fontSize={36}
                            fontWeight={900}
                            color="#064e3b"
                        >
                            AVANI-C
                        </Typography>
                    </Box>

                    {/* Main Statement */}
                    <Typography
                        fontSize={28}
                        fontWeight={800}
                        lineHeight={1.2}
                        color="#052e26"
                    >
                        Measure today.
                        <br />
                        Protect tomorrow.
                    </Typography>

                    {/* Supporting Text */}
                    <Typography
                        fontSize={16}
                        lineHeight={1.6}
                        color="text.secondary"
                    >
                        EcoPortal empowers governments, institutions, organizations,
                        and individuals to track carbon savings, drive sustainable
                        decisions, and visualize real environmental impact in one
                        unified system.
                    </Typography>

                    {/* Role Context */}
                    <Box>
                        <Typography
                            fontSize={14}
                            fontWeight={700}
                            color="#064e3b"
                        >
                            {roleLabel}
                        </Typography>
                        <Typography
                            fontSize={13}
                            color="text.secondary"
                        >
                            {roleDescription}
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            {/* RIGHT PANEL */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    px: 3
                }}
            >
                <Box sx={{ width: "100%", maxWidth: 420 }}>
                    <Stack spacing={3}>
                        {showBack && (
                            <IconButton
                                onClick={() => navigate(-1)}
                                sx={{
                                    alignSelf: "flex-start",
                                    bgcolor: "#e7fff3",
                                    "&:hover": { bgcolor: "#d1fbec" }
                                }}
                            >
                                <ArrowBackRoundedIcon />
                            </IconButton>
                        )}
                        {children}
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}
