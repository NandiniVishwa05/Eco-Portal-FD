import React, { useEffect, useRef, useState } from 'react';
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
} from '@mui/material';
import { Html5Qrcode } from 'html5-qrcode';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import CloseIcon from '@mui/icons-material/Close';

export default function QRScannerModal({ open, onClose, onScanSuccess }) {
    const [scanning, setScanning] = useState(false);
    const [error, setError] = useState(null);
    const [scannedData, setScannedData] = useState(null);
    const [cameraReady, setCameraReady] = useState(false);
    const html5QrCodeRef = useRef(null);
    const isStartingRef = useRef(false);

    useEffect(() => {
        if (open) {
            // Wait for the dialog to fully render before starting camera
            const timer = setTimeout(() => {
                startScanner();
            }, 300);
            
            return () => {
                clearTimeout(timer);
                stopScanner();
            };
        } else {
            stopScanner();
        }
    }, [open]);

    const startScanner = async () => {
        if (isStartingRef.current || html5QrCodeRef.current) {
            return; // Prevent multiple starts
        }

        try {
            isStartingRef.current = true;
            setError(null);
            setCameraReady(false);

            // Check if element exists
            const element = document.getElementById("qr-reader");
            if (!element) {
                throw new Error("Scanner element not found");
            }

            const html5QrCode = new Html5Qrcode("qr-reader");
            html5QrCodeRef.current = html5QrCode;

            // Try to get camera devices first
            const devices = await Html5Qrcode.getCameras();
            
            if (!devices || devices.length === 0) {
                throw new Error("No cameras found on this device");
            }

            // Start with back camera (environment) or first available camera
            const cameraId = devices.length > 1 ? devices[1].id : devices[0].id;

            await html5QrCode.start(
                cameraId,
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1.0
                },
                (decodedText) => {
                    handleScanSuccess(decodedText);
                },
                (errorMessage) => {
                    // Ignore scanning errors while camera is active
                }
            );

            setScanning(true);
            setCameraReady(true);
            isStartingRef.current = false;
        } catch (err) {
            console.error("Error starting scanner:", err);
            isStartingRef.current = false;
            
            let errorMsg = "Unable to access camera. Please check permissions.";
            
            if (err.message?.includes("NotAllowedError")) {
                errorMsg = "Camera access denied. Please allow camera permissions in your browser settings.";
            } else if (err.message?.includes("NotFoundError")) {
                errorMsg = "No camera found on this device.";
            } else if (err.message?.includes("NotReadableError")) {
                errorMsg = "Camera is being used by another application.";
            }
            
            setError(errorMsg);
            setScanning(false);
        }
    };

    const stopScanner = async () => {
        if (html5QrCodeRef.current && scanning) {
            try {
                await html5QrCodeRef.current.stop();
                await html5QrCodeRef.current.clear();
            } catch (err) {
                console.error("Error stopping scanner:", err);
            }
        }
        html5QrCodeRef.current = null;
        isStartingRef.current = false;
        setScanning(false);
        setCameraReady(false);
    };

    const handleScanSuccess = (decodedText) => {
        setScannedData(decodedText);
        stopScanner();
        
        if (onScanSuccess) {
            onScanSuccess(decodedText);
        }
    };

    const handleClose = () => {
        stopScanner();
        setScannedData(null);
        setError(null);
        onClose();
    };

    const handleRetry = () => {
        setScannedData(null);
        setError(null);
        startScanner();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '16px',
                    p: 2
                }
            }}
        >
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <QrCodeScannerIcon sx={{ fontSize: 28, color: 'primary.main' }} />
                    <Typography fontSize={20} fontWeight={700}>
                        Scan QR Code
                    </Typography>
                </Box>
                <IconButton onClick={handleClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                {error && (
                    <Alert severity="error" sx={{ mb: 2, borderRadius: '12px' }}>
                        {error}
                    </Alert>
                )}

                {scannedData && (
                    <Alert severity="success" sx={{ mb: 2, borderRadius: '12px' }}>
                        <Typography fontWeight={600} mb={0.5}>
                            QR Code Scanned Successfully!
                        </Typography>
                        <Typography fontSize={14} sx={{ wordBreak: 'break-all' }}>
                            {scannedData}
                        </Typography>
                    </Alert>
                )}

                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        minHeight: '300px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        backgroundColor: 'background.default',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {!cameraReady && !scannedData && !error && (
                        <Box sx={{ textAlign: 'center', p: 3 }}>
                            <QrCodeScannerIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                            <Typography color="text.secondary" mb={2}>
                                Initializing camera...
                            </Typography>
                            <CircularProgress />
                        </Box>
                    )}

                    {error && (
                        <Box sx={{ textAlign: 'center', p: 3 }}>
                            <Typography color="error" fontWeight={600}>
                                Camera Error
                            </Typography>
                        </Box>
                    )}

                    <Box
                        id="qr-reader"
                        sx={{
                            width: '100%',
                            '& video': {
                                width: '100%',
                                borderRadius: '12px'
                            },
                            '& #qr-shaded-region': {
                                border: '2px solid rgba(0, 255, 0, 0.5) !important'
                            }
                        }}
                    />
                </Box>

                {scanning && cameraReady && (
                    <Typography fontSize={14} color="text.secondary" textAlign="center" mt={2}>
                        Position the QR code within the frame to scan
                    </Typography>
                )}
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
                {(scannedData || error) && (
                    <Button
                        onClick={handleRetry}
                        variant="outlined"
                        sx={{
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontWeight: 600,
                            flex: 1
                        }}
                    >
                        {error ? 'Retry' : 'Scan Another'}
                    </Button>
                )}
                {!scannedData && !error && (
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                        sx={{
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontWeight: 600,
                            flex: 1
                        }}
                    >
                        Cancel
                    </Button>
                )}
                <Button
                    onClick={handleClose}
                    variant="contained"
                    sx={{
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontWeight: 600,
                        flex: 1,
                        backgroundColor: 'primary.main',
                        '&:hover': {
                            backgroundColor: 'primary.dark'
                        }
                    }}
                >
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    );
}