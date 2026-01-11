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
                const data = await getGovernmentAvailableCertificates();
                setGovData(data);
            } catch (e) {
                console.error("Failed to fetch government certificates", e);
            }
        };

        fetchGov();
    }, [certificateRole]);

    /* ================= REDEEM ================= */
    const handleRedeem = async (id) => {
        try {
            await redeemCertificate(id);
            setRows(prev => prev.filter(r => r.id !== id));
        } catch (e) {
            console.error("Redeem failed", e);
        }
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
                            certificates={govData[role] || []}
                        />
                    ))}
            </Stack>
        </Box>
    );
}
