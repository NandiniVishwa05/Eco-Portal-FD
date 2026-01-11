import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Stack
} from "@mui/material";
import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function QRScannerModal({ open, onClose, onScan }) {
    const scannerRef = useRef(null);
    const hasStartedRef = useRef(false);

    useEffect(() => {
        if (!open) return;

        const startScanner = async () => {
            if (hasStartedRef.current) return;

            try {
                const html5QrCode = new Html5Qrcode("qr-reader");
                scannerRef.current = html5QrCode;

                await html5QrCode.start(
                    { facingMode: "environment" }, // rear camera
                    {
                        fps: 10,
                        qrbox: { width: 250, height: 250 }
                    },
                    (decodedText) => {
                        onScan(decodedText);
                        stopScanner();
                        onClose();
                    }
                );

                hasStartedRef.current = true;
            } catch (err) {
                console.error("Failed to start QR scanner:", err);
            }
        };

        // Delay ensures DOM is mounted
        setTimeout(startScanner, 300);

        return () => {
            stopScanner();
        };
    }, [open]);

    const stopScanner = async () => {
        try {
            if (scannerRef.current?.isScanning) {
                await scannerRef.current.stop();
                await scannerRef.current.clear();
            }
        } catch (err) {
            console.warn("QR stop error:", err);
        } finally {
            hasStartedRef.current = false;
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            keepMounted   // 🔴 IMPORTANT
        >
            <DialogTitle>Scan QR Code</DialogTitle>

            <DialogContent>
                <Stack spacing={2} alignItems="center">
                    {/* 🔴 HEIGHT IS CRITICAL */}
                    <div
                        id="qr-reader"
                        style={{
                            width: "100%",
                            height: "300px",
                            borderRadius: "12px",
                            overflow: "hidden"
                        }}
                    />

                    <Button variant="outlined" onClick={onClose}>
                        Close
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}
