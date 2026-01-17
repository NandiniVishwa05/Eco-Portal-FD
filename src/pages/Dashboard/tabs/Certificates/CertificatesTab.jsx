import { Box, Tabs, Tab, Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { certificatesTabsConfig } from "./certificatesTabsConfig";
import { certificatesColumns } from "./certificatesColumns";
import {
    mapAvailableCertificates,
    mapRedeemedCertificates
} from "./certificatesMapper";

import CertificatesTable from "./CertificatesTable";
import CertificatesRoleSection from "./CertificatesRoleSection";

import {
    getAvailableCertificates,
    getRedeemedCertificates,
    redeemCertificate,
    getGovernmentAvailableCertificates
} from "../../../../services/certificateService";
import PaymentDialog from "../Reports/PaymentDialog";

export default function CertificatesTab() {
    const { userType, user } = useSelector(state => state.auth);

    const certificateRole =
        userType === "organization" && user?.organization_type === "college"
            ? "college"
            : userType;

    const config = certificatesTabsConfig[certificateRole];

    /* ================= USER DASHBOARDS ================= */
    const [activeTab, setActiveTab] = useState(
        config?.type === "user" ? "available" : null
    );
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    /* ================= PAYMENT DIALOG ================= */
    const [showPaymentDialog, setShowPaymentDialog] = useState(false);
    const [selectedCertificate, setSelectedCertificate] = useState(null);

    /* ================= GOVERNMENT DASHBOARD ================= */
    const [govData, setGovData] = useState(null);

    /* ================= FETCH USER CERTIFICATES ================= */
    useEffect(() => {
        if (config?.type !== "user") return;

        const fetch = async () => {
            setLoading(true);
            try {
                if (activeTab === "available") {
                    const data = await getAvailableCertificates();
                    setRows(mapAvailableCertificates(data));
                } else {
                    const data = await getRedeemedCertificates();
                    setRows(mapRedeemedCertificates(data));
                }
            } catch (e) {
                console.error(e);
                setRows([]);
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, [activeTab, certificateRole]);

    /* ================= FETCH GOVERNMENT CERTIFICATES ================= */
    useEffect(() => {
        if (config?.type !== "government") return;

        const fetchGov = async () => {
            try {
                setLoading(true);
                const data = await getGovernmentAvailableCertificates();
                setGovData(data);
            } catch (e) {
                console.error("Failed to fetch government certificates", e);
            } finally {
                setLoading(false);
            }
        };

        fetchGov();
    }, [certificateRole]);

    /* ================= REDEEM ================= */
    const handleRedeem = async (row) => {
        try {
            // Store selected certificate for payment dialog
            setSelectedCertificate(row);

            // Call API to redeem
            await redeemCertificate(row.id);

            // Remove from available list
            setRows(prev => prev.filter(r => r.id !== row.id));

            // Show payment success dialog
            setShowPaymentDialog(true);
        } catch (e) {
            console.error("Redeem failed", e);
        }
    };

    const handleClosePaymentDialog = () => {
        setShowPaymentDialog(false);
        setSelectedCertificate(null);
    };

    if (!config) return null;

    /* ================= USER UI ================= */
    if (config.type === "user") {
        const columns =
            activeTab === "available"
                ? certificatesColumns.available(handleRedeem)
                : certificatesColumns.redeemed;

        return (
            <Box>
                <Box sx={{ mb: 2 }}>
                    <Typography fontSize={20} fontWeight={600}>
                        Certificates
                    </Typography>
                    <Typography fontSize={14} color="text.secondary">
                        View available and redeemed certificates.
                    </Typography>
                </Box>

                <Tabs sx={{ mb: 2 }} value={activeTab} onChange={(_, v) => setActiveTab(v)}>
                    {config.tabs.map(tab => (
                        <Tab key={tab.key} value={tab.key} label={tab.label} />
                    ))}
                </Tabs>

                <CertificatesTable
                    columns={columns}
                    rows={rows}
                    loading={loading}
                    emptyMessage="No certificates found."
                />

                {/* Payment Success Dialog */}
                <PaymentDialog
                    open={showPaymentDialog}
                    onClose={handleClosePaymentDialog}
                    amount={selectedCertificate?.cost || 0}
                    title="Redemption Successful!"
                />
            </Box>
        );
    }

    /* ================= GOVERNMENT UI ================= */
    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography fontSize={20} fontWeight={600} mb={2}>
                    Certificates
                </Typography>
                <Typography fontSize={14} color="text.secondary">
                    View available and redeemed certificates.
                </Typography>
            </Box>

            <Stack spacing={4}>
                {govData &&
                    config.roles.map(role => (
                        <CertificatesRoleSection
                            key={role}
                            role={role}
                            loading={loading}
                            certificates={govData[role] || []}
                        />
                    ))}
            </Stack>
        </Box>
    );
}