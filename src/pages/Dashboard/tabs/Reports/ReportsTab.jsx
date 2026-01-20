import React, { useState } from 'react';
import { Typography, Box, Snackbar, Alert } from '@mui/material';
import ReportFilter from './ReportFilter';
import ReportDownload from './ReportDownload';
import PaymentDialog from './PaymentDialog';

export default function ReportsTab() {
    const [selectedReport, setSelectedReport] = useState('');
    const [reportCost, setReportCost] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [showPaymentDialog, setShowPaymentDialog] = useState(false);

    const handleSearch = (data) => {
        setSelectedReport(data.report);
        setReportCost(data.reportCost);
    };

    const handleDownload = () => {
        // Download Excel file
        const link = document.createElement('a');
        link.href = '/src/assets/Eco_Reports.xlsx';
        link.download = 'Eco_Reports.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Show success toast
        setShowToast(true);

        // Show payment dialog after a brief delay
        setTimeout(() => {
            setShowPaymentDialog(true);
        }, 500);
    };

    const handleCloseToast = () => {
        setShowToast(false);
    };

    const handleClosePaymentDialog = () => {
        setShowPaymentDialog(false);
    };

    return (
        <Box>
            <Typography fontSize={20} fontWeight={600} >
                Reports 
            </Typography>
            <Typography fontSize={14} color="text.secondary" mb={4}>
                Pay and Download reports. 
            </Typography>

            <Box 
                sx={{ 
                    // p: 3,
                    borderRadius: '16px',
                    backgroundColor: 'background.paper',
                    // border: '2px solid',
                    // borderColor: 'rgba(15, 123, 107, 0.15)',
                    mb: 3,
                    // boxShadow: '0 2px 8px rgba(15, 123, 107, 0.08)'
                }}
            >
                <Typography fontSize={16} fontWeight={600} mb={3} color="primary.main">
                    Filter Reports
                </Typography>
                <ReportFilter onSearch={handleSearch} />
            </Box>
            
            {selectedReport && (
                <Box 
                    sx={{ 
                        // p: 3,
                        borderRadius: '16px',
                        backgroundColor: 'background.paper',
                        // border: '2px solid',
                        // borderColor: 'rgba(15, 123, 107, 0.15)',
                        // boxShadow: '0 2px 8px rgba(15, 123, 107, 0.08)'
                    }}
                >
                    <Typography fontSize={16} fontWeight={600} mb={3} color="primary.main">
                        Download Report
                    </Typography>
                    <ReportDownload 
                        reportName={selectedReport} 
                        reportCost={reportCost} 
                        onDownload={handleDownload}
                    />
                </Box>
            )}

            {/* Toast Notification */}
            <Snackbar
                open={showToast}
                autoHideDuration={3000}
                onClose={handleCloseToast}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseToast}
                    severity="success"
                    sx={{
                        width: '100%',
                        borderRadius: '12px',
                        fontWeight: 500
                    }}
                >
                    Download Successfully!
                </Alert>
            </Snackbar>

            {/* Payment Success Dialog */}
            <PaymentDialog
                open={showPaymentDialog}
                onClose={handleClosePaymentDialog}
                amount={reportCost}
            />
        </Box>
    );
}