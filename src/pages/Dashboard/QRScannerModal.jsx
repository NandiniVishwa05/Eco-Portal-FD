import React, { useEffect, useRef, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Alert,
    CircularProgress,
    IconButton
} from "@mui/material";
import { Html5Qrcode } from "html5-qrcode";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import CloseIcon from "@mui/icons-material/Close";
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";

export default function QRScannerModal({ open, onClose, onScanSuccess }) {
    const html5QrCodeRef = useRef(null);
    const isStartingRef = useRef(false);

    const [scanning, setScanning] = useState(false);
    const [cameraReady, setCameraReady] = useState(false);
    const [error, setError] = useState(null);
    const [scannedData, setScannedData] = useState(null);

    const [cameras, setCameras] = useState([]);
    const [currentCameraIndex, setCurrentCameraIndex] = useState(0);

    /* -------------------- EFFECT -------------------- */
    useEffect(() => {
        if (!open) {
            stopScanner();
            return;
        }

        const timer = setTimeout(startScanner, 300);
        return () => {
            clearTimeout(timer);
            stopScanner();
        };
    }, [open, currentCameraIndex]);

    /* -------------------- START SCANNER -------------------- */
    const startScanner = async () => {
        if (isStartingRef.current || html5QrCodeRef.current) return;

        try {
            isStartingRef.current = true;
            setError(null);
            setCameraReady(false);

            const element = document.getElementById("qr-reader");
            if (!element) throw new Error("Scanner container not found");

            const devices = await Html5Qrcode.getCameras();
            if (!devices || !devices.length) {
                throw new Error("No camera devices found");
            }

            setCameras(devices);

            const cameraId =
                devices[currentCameraIndex]?.id || devices[0].id;

            const html5QrCode = new Html5Qrcode("qr-reader");
            html5QrCodeRef.current = html5QrCode;

            await html5QrCode.start(
                cameraId,
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1
                },
                handleScanSuccess,
                () => { }
            );

            setScanning(true);
            setCameraReady(true);
        } catch (err) {
            console.error(err);
            setError(
                err.message?.includes("permission")
                    ? "Camera permission denied."
                    : "Unable to access camera."
            );
        } finally {
            isStartingRef.current = false;
        }
    };

    /* -------------------- STOP SCANNER -------------------- */
    const stopScanner = async () => {
        try {
            if (html5QrCodeRef.current) {
                await html5QrCodeRef.current.stop();
                await html5QrCodeRef.current.clear();
            }
        } catch (err) {
            console.warn("Stop scanner error:", err);
        } finally {
            html5QrCodeRef.current = null;
            setScanning(false);
            setCameraReady(false);
        }
    };

    /* -------------------- SCAN SUCCESS -------------------- */
    const handleScanSuccess = (decodedText) => {
        setScannedData(decodedText);
        stopScanner();

        // 🔗 Auto redirect if URL
        if (/^https?:\/\//i.test(decodedText)) {
            window.open(decodedText, "_blank", "noopener,noreferrer");
            return;
        }

        onScanSuccess?.(decodedText);
    };

    /* -------------------- SWITCH CAMERA -------------------- */
    const handleSwitchCamera = async () => {
        if (cameras.length <= 1) return;
        setCurrentCameraIndex(
            (prev) => (prev + 1) % cameras.length
        );
    };

    /* -------------------- CLOSE -------------------- */
    const handleClose = () => {
        stopScanner();
        setError(null);
        setScannedData(null);
        onClose();
    };

    const handleRetry = () => {
        setError(null);
        setScannedData(null);
        startScanner();
    };

    /* -------------------- UI -------------------- */
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{ sx: { borderRadius: 4, p: 2 } }}
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <Box display="flex" alignItems="center" gap={1}>
                    <QrCodeScannerIcon color="primary" />
                    <Typography fontWeight={700}>Scan QR Code</Typography>
                </Box>

                <Box>
                    {cameras.length > 1 && (
                        <IconButton onClick={handleSwitchCamera}>
                            <CameraswitchIcon />
                        </IconButton>
                    )}
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {scannedData && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        QR scanned successfully
                    </Alert>
                )}

                {/* SCANNER CONTAINER */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: 320,
                        borderRadius: 3,
                        backgroundColor: "background.default"
                    }}
                >
                    {!cameraReady && !error && !scannedData && (
                        <Box textAlign="center">
                            <CircularProgress />
                            <Typography mt={2} color="text.secondary">
                                Initializing camera…
                            </Typography>
                        </Box>
                    )}

                    <Box
                        id="qr-reader"
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            width: 280,
                            height: 280,
                            maxWidth: "100%",
                            "& video": {
                                width: "100%",
                                borderRadius: 3,
                                objectFit: "cover"
                            },
                            "& canvas": {
                                width: "100% !important"
                            }
                        }}
                    />
                </Box>

                {scanning && cameraReady && (
                    <Typography
                        fontSize={14}
                        textAlign="center"
                        color="text.secondary"
                        mt={2}
                    >
                        Align QR code within the frame
                    </Typography>
                )}
            </DialogContent>

            <DialogActions>
                {(error || scannedData) && (
                    <Button
                        variant="outlined"
                        onClick={handleRetry}
                        sx={{ borderRadius: 3, fontWeight: 600 }}
                    >
                        Scan Again
                    </Button>
                )}
                <Button
                    variant="contained"
                    onClick={handleClose}
                    sx={{ borderRadius: 3, fontWeight: 600 }}
                >
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    );
}
