import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Tabs, Tab, Box, Typography } from "@mui/material";

import ActivitiesTable from "./ActivitiesTable";
import {
    GOVERNMENT_COLUMNS,
    INDIVIDUAL_COLUMNS,
    SELLING_COLUMNS
} from "./activityColumns.jsx";

import {
    getBuyerActivities,
    getSellerActivities,
    getAllActivities
} from "../../../../services/activityService";

import {
    mapBuyerActivities,
    mapSellerActivities,
    mapGovernmentActivities
} from "./activityMapper";

export default function ActivitiesTab() {
    const { userType } = useSelector(state => state.auth);

    const [mode, setMode] = useState("purchase");
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchActivities();
        // eslint-disable-next-line
    }, [mode, userType]);

    const fetchActivities = async () => {
        setLoading(true);

        try {
            let data = [];

            if (userType === "government") {
                data = await getAllActivities();
                setRows(mapGovernmentActivities(data));
            }
            else if (userType === "individual" || userType === "college") {
                data = await getBuyerActivities();
                setRows(mapBuyerActivities(data));
            }
            else {
                if (mode === "purchase") {
                    data = await getBuyerActivities();
                    setRows(mapBuyerActivities(data));
                } else {
                    data = await getSellerActivities();
                    setRows(mapSellerActivities(data));
                }
            }
        } catch (err) {
            console.error("Failed to fetch activities", err);
            setRows([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            {/* PAGE HEADER */}
            <Box sx={{ mb: 2 }}>
                <Typography fontSize={20} fontWeight={600}>
                    Activities
                </Typography>
                <Typography fontSize={14} color="text.secondary">
                    Track, review, and manage all eco-friendly activities associated with your account.
                </Typography>
            </Box>

            {/* GOVERNMENT */}
            {userType === "government" && (
                <ActivitiesTable
                    columns={GOVERNMENT_COLUMNS}
                    rows={rows}
                    loading={loading}
                    emptyMessage="No activities recorded across the platform yet."
                />
            )}

            {/* INDIVIDUAL / COLLEGE */}
            {(userType === "individual" || userType === "college") && (
                <ActivitiesTable
                    columns={INDIVIDUAL_COLUMNS}
                    rows={rows}
                    loading={loading}
                    emptyMessage="No purchase history available yet."
                />
            )}

            {/* ORGANIZATION */}
            {userType === "organization" && (
                <>
                    <Tabs
                        value={mode}
                        onChange={(_, v) => setMode(v)}
                        sx={{ mb: 2 }}
                    >
                        <Tab label="Purchase History" value="purchase" />
                        <Tab label="Selling History" value="selling" />
                    </Tabs>

                    <ActivitiesTable
                        columns={mode === "purchase" ? INDIVIDUAL_COLUMNS : SELLING_COLUMNS}
                        rows={rows}
                        loading={loading}
                        emptyMessage={
                            mode === "purchase"
                                ? "No purchase history available yet."
                                : "No selling activity recorded yet."
                        }
                    />
                </>
            )}
        </Box>
    );
}
