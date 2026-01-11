import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getAvailableReports } from '../../../../services/reportsService';
import EcoSelect from '../../../../components/common/EcoSelect';
import EcoDate from '../../../../components/common/EcoDate';


export default function ReportFilter({ onSearch }) {
    const [selectedReport, setSelectedReport] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [reportOptions, setReportOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchReports = async () => {
            setLoading(true);
            try {
                const reports = await getAvailableReports();
                setReportOptions(reports || []);
            } catch (error) {
                console.error('Error fetching reports:', error);
                setReportOptions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    const handleSearch = () => {
        if (onSearch) {
            // Find the full report object to pass cost along with name
            const selectedReportObj = reportOptions.find(r => r.report_name === selectedReport);
            onSearch({
                report: selectedReport,
                reportCost: selectedReportObj?.cost || 0,
                fromDate,
                toDate
            });
        }
    };

    return (
        <Box sx={{ mb: 3 }}>
            <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                gap: 2,
                mb: 2
            }}>
                <EcoSelect
                    label="Select Report"
                    value={selectedReport}
                    onChange={(e) => setSelectedReport(e.target.value)}
                    options={reportOptions.map(r => r.report_name)}
                    disabled={loading}
                    InputLabelProps={{
                        shrink: true
                    }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            backgroundColor: "background.paper",

                            "& fieldset": {
                                borderColor: "rgba(15, 123, 107, 0.25)"
                            },

                            "&:hover fieldset": {
                                borderColor: "primary.main"
                            },

                            "&.Mui-focused fieldset": {
                                borderColor: "primary.main",
                                borderWidth: "2px"
                            }
                        },

                        "& .MuiInputLabel-root": {
                            fontWeight: 600,
                            fontSize: "13px",
                            color: "text.secondary"
                        },

                        "& .MuiInputBase-input": {
                            padding: "14px",
                            fontSize: "14px"
                        }
                    }}
                />
                
                <EcoDate
                    label="From Date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                />
                
                <EcoDate
                    label="To Date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    startIcon={<SearchIcon />}
                    onClick={handleSearch}
                    sx={{
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 4,
                        py: 1.5,
                        backgroundColor: 'primary.main',
                        '&:hover': {
                            backgroundColor: 'primary.dark'
                        }
                    }}
                >
                    Search
                </Button>
            </Box>
        </Box>
    );
}