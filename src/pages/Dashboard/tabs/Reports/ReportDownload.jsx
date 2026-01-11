import React from 'react';
import { 
    Box, 
    Button, 
    Typography
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

export default function ReportDownload({ reportName, reportCost, onDownload }) {
    if (!reportName) {
        return null;
    }

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 3,
                borderRadius: '12px',
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'rgba(15, 123, 107, 0.25)',
                mb: 2
            }}
        >
            <Box>
                <Typography 
                    fontSize={16} 
                    fontWeight={600}
                    color="text.primary"
                    mb={0.5}
                >
                    {reportName}
                </Typography>
                <Typography 
                    fontSize={20} 
                    fontWeight={700}
                    color="primary.main"
                >
                    ₹{reportCost}
                </Typography>
            </Box>

            <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={onDownload}
                sx={{
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    backgroundColor: 'primary.main',
                    '&:hover': {
                        backgroundColor: 'primary.dark'
                    }
                }}
            >
                Download
            </Button>
        </Box>
    );
}