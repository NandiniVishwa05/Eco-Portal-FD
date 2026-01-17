import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Stack
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import QrCodeScannerRoundedIcon from "@mui/icons-material/QrCodeScannerRounded";
import { scanProduct } from "../../services/productService";
import { getUserInfo } from "../../services/authService";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth/authSlice";

function QRScannerPage() {
    const { product_id } = useParams();
    const dispatch = useDispatch();
    const [status, setStatus] = useState("loading"); // loading | success | error

    const fetchUserInfo = async () => {
        try {
            const response = await getUserInfo();
            dispatch(loginSuccess(response));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        scanProduct({ product_id })
            .then(() => {
                setStatus("success");
            })
            .catch((error) => {
                console.error(error);
                setStatus("error");
            });
        fetchUserInfo();
    }, [product_id]);

    return (
        <Box
            minHeight="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
                background: (theme) => theme.palette.background.default,
                px: 2
            }}
        >
            <Card
                elevation={1}
                sx={{
                    maxWidth: 420,
                    width: "100%",
                    textAlign: "center",
                    borderRadius: 4,
                    background: (theme) => theme.custom.gradients.card,
                    border: (theme) => `1px solid ${theme.palette.divider}`
                }}
            >
                <CardContent sx={{ p: 4 }}>
                    {/* Header Icon */}
                    <Box
                        sx={{
                            width: 72,
                            height: 72,
                            mx: "auto",
                            mb: 3,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: (theme) =>
                                status === "success"
                                    ? theme.custom.gradients.accent
                                    : status === "error"
                                        ? "linear-gradient(90deg,#e74c3c,#c0392b)"
                                        : theme.custom.gradients.logo
                        }}
                    >
                        {status === "loading" && (
                            <QrCodeScannerRoundedIcon sx={{ fontSize: 36 }} />
                        )}
                        {status === "success" && (
                            <CheckCircleRoundedIcon sx={{ fontSize: 40, color: "#fff" }} />
                        )}
                        {status === "error" && (
                            <ErrorRoundedIcon sx={{ fontSize: 40, color: "#fff" }} />
                        )}
                    </Box>

                    {/* Content */}
                    {status === "loading" && (
                        <Stack spacing={2} alignItems="center">
                            <CircularProgress color="primary" />
                            <Typography variant="h6">
                                Scanning Product QR
                            </Typography>
                            <Typography color="text.secondary" variant="body2">
                                Please wait while we verify and redeem your EcoPoints
                            </Typography>
                        </Stack>
                    )}

                    {status === "success" && (
                        <Stack spacing={1.5}>
                            <Typography variant="h5" fontWeight={600}>
                                EcoPoints Redeemed 🌿
                            </Typography>
                            <Typography color="text.secondary">
                                Thank you for making a sustainable choice.
                            </Typography>
                        </Stack>
                    )}

                    {status === "error" && (
                        <Stack spacing={1.5}>
                            <Typography variant="h5" fontWeight={600}>
                                Redemption Failed
                            </Typography>
                            <Typography color="text.secondary">
                                This QR code is invalid or already redeemed.
                            </Typography>
                        </Stack>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}

export default QRScannerPage;
