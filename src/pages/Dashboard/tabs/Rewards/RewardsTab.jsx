import { Box, Stack, Tab, Tabs, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { rewardsTabsConfig } from "./rewardsTabsConfig";
import { rewardsColumns } from "./rewardsColumns";
import RewardsTable from "./RewardsTable";
import CreateRewardModal from "./CreateRewardModal";
import GovernmentRewardsSection from "./GovernmentRewardsSection";
import { loginSuccess } from "../../../../features/auth/authSlice";
import { getUserInfo } from "../../../../services/authService";
import {
    getAvailableRewards,
    getCreatedRewardsByUser,
    getRewardHistoryForUser,
    redeemReward
} from "../../../../services/rewardService";

import {
    mapAvailableRewards,
    mapRedeemedRewards,
    mapCreatedRewards
} from "./rewardsMapper";
import RewardSuccessDialog from "./RewardSuccessDialog";
import EcoAlert from "../../../../components/common/EcoAlertDialog";

export default function RewardsTab() {
    const [successDialog, setSuccessDialog] = useState({
        open: false,
        rewardName: "",
        points: null
    });
    const { userType, user } = useSelector(state => state.auth);
    const [openCreate, setOpenCreate] = useState(false);
    const [alert, setAlert] = useState({
        open: false,
        type: "success",
        message: ""
    });
    const dispatch = useDispatch();
    const rewardRole =
        userType === "organization" && user?.organization_type === "college"
            ? "college"
            : userType;

    const config = rewardsTabsConfig[rewardRole];

    const [activeTab, setActiveTab] = useState(null);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    // derive current tab safely
    const currentTab = config?.tabs?.find(t => t.key === activeTab);

    // set default tab on role change
    useEffect(() => {
        if (config?.tabs?.length) {
            setActiveTab(config.tabs[0].key);
        }
    }, [rewardRole]);

    const handleRedeem = async (rewardId, rewardCost, rewardName) => {
        try {
            const res = await redeemReward(rewardId);
            const userInfo = await getUserInfo();
            console.log(userInfo);
            dispatch(loginSuccess(userInfo));
            setRows(prev => prev.filter(r => r.id !== rewardId));
            setSuccessDialog({
                open: true,
                rewardName,
                points: rewardCost
            });
            // dispatch(updateEcoPoints({ rewardCost }));
        } catch (err) {
            const backendMessage =
                err?.response?.data?.error ||
                err?.response?.data?.message ||
                "Something went wrong. Please try again.";

            setAlert({
                open: true,
                type: "error",
                message: backendMessage
            });
            console.error("Failed to redeem reward", err);
        }
    };

    useEffect(() => {
        if (!currentTab) return;

        const fetchRewards = async () => {
            setLoading(true);
            try {
                let data = [];

                // AVAILABLE / PLATFORM (same API)
                if (
                    currentTab.type === "available" ||
                    currentTab.type === "platform"
                ) {
                    data = await getAvailableRewards();

                    // 👇 for government + platform, keep RAW
                    if (rewardRole === "government" && currentTab.type === "platform") {
                        setRows(data);
                    } else {
                        setRows(mapAvailableRewards(data));
                    }
                }

                if (currentTab.type === "redeemed") {
                    data = await getRewardHistoryForUser();
                    setRows(mapRedeemedRewards(data));
                }

                if (currentTab.type === "created_by_self") {
                    data = await getCreatedRewardsByUser();
                    setRows(mapCreatedRewards(data));
                }
            } catch (err) {
                const backendMessage =
                    err?.response?.data?.error ||
                    err?.response?.data?.message ||
                    "Something went wrong. Please try again.";

                setAlert({
                    open: true,
                    type: "error",
                    message: backendMessage
                });
                console.error("Failed to fetch rewards", err);
                setRows([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRewards();
    }, [currentTab, rewardRole]);

    if (!config || !activeTab) return null;

    /* ======================================================
       🏛️ GOVERNMENT – ALL REWARDS (STACKED TABLES)
       (ONLY FOR platform tab)
    ====================================================== */
    if (
        rewardRole === "government" &&
        currentTab?.type === "platform"
    ) {
        return (
            <Box>
                <EcoAlert
                    open={alert.open}
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert({ ...alert, open: false })}
                />
                <Stack direction="row" justifyContent="space-between" >
                    <Box >
                        <Typography fontSize={20} fontWeight={600} mb={2}>
                            Rewards
                        </Typography>
                        <Typography fontSize={14} color="text.secondary">
                            Track, redeem, and manage all eco-friendly rewards associated with your account.
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        onClick={() => setOpenCreate(true)}
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: 14,
                            borderRadius: 3,
                            height: 36,
                            minWidth: "max-content",
                        }}
                    >
                        Create Reward
                    </Button>
                </Stack>

                {/* Tabs stay visible */}
                <Tabs
                    value={activeTab}
                    onChange={(_, v) => setActiveTab(v)}
                    sx={{ mb: 2 }}
                >
                    {config.tabs.map(tab => (
                        <Tab
                            key={tab.key}
                            value={tab.key}
                            label={tab.label}
                        />
                    ))}
                </Tabs>

                {/* 6 stacked tables */}
                <Stack spacing={4} sx={{ mt: 3 }}>
                    <GovernmentRewardsSection
                        loading={loading}
                        title="Individual Rewards"
                        role="individual"
                        rewards={rows}
                    />
                    {/* <GovernmentRewardsSection
                        loading={loading}
                        title="College Rewards"
                        role="college"
                        rewards={rows}
                    /> */}
                    <GovernmentRewardsSection
                        loading={loading}
                        title="Manufacturer Rewards"
                        role="manufacturer"
                        rewards={rows}
                    />
                    <GovernmentRewardsSection
                        loading={loading}
                        title="Retailer Rewards"
                        role="retailer"
                        rewards={rows}
                    />
                    <GovernmentRewardsSection
                        loading={loading}
                        title="Other Rewards"
                        role="seller"
                        rewards={rows}
                    />
                    {/* <GovernmentRewardsSection
                        loading={loading}
                        title="Institution Rewards"
                        role="institution"
                        rewards={rows}
                    /> */}
                </Stack>

                <CreateRewardModal
                    open={openCreate}
                    onClose={() => setOpenCreate(false)}
                    onSuccess={(message) => {
                        setAlert({
                            open: true,
                            type: "success",
                            message: message
                        });
                    }}
                    onError={(err) => {
                        const backendMessage =
                            err?.response?.data?.error ||
                            err?.response?.data?.message ||
                            "Something went wrong. Please try again.";

                        setAlert({
                            open: true,
                            type: "error",
                            message: backendMessage
                        });
                    }}
                />
            </Box>
        );
    }

    /* ======================================================
       🧑‍💼 ALL OTHER CASES (INCLUDING
       Government → Created Rewards)
    ====================================================== */
    const columns =
        typeof rewardsColumns[currentTab.type] === "function"
            ? rewardsColumns[currentTab.type](handleRedeem)
            : rewardsColumns[currentTab.type];

    return (
        <Box>
            <EcoAlert
                open={alert.open}
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert({ ...alert, open: false })}
            />
            <RewardSuccessDialog
                open={successDialog.open}
                rewardName={successDialog.rewardName}
                points={successDialog.points}
                onClose={() =>
                    setSuccessDialog({
                        open: false,
                        rewardName: "",
                        points: null
                    })
                }
            />

            <Stack direction="row" justifyContent="space-between" mb={2}>
                <Box>
                    <Typography fontSize={20} fontWeight={600}>
                        Rewards
                    </Typography>
                    <Typography fontSize={14} color="text.secondary">
                        Track, redeem, and manage all eco-friendly rewards associated with your account.
                    </Typography>
                </Box>

                {config.showCreate && (
                    <Button
                        variant="contained"
                        onClick={() => setOpenCreate(true)}
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: 14,
                            borderRadius: 3,
                            height: 36,
                            minWidth: "max-content",
                        }}
                    >
                        Create Reward
                    </Button>
                )}
            </Stack>

            <Tabs
                value={activeTab}
                onChange={(_, v) => setActiveTab(v)}
                sx={{ mb: 2 }}
            >
                {config.tabs.map(tab => (
                    <Tab
                        key={tab.key}
                        value={tab.key}
                        label={tab.label}
                    />
                ))}
            </Tabs>

            <RewardsTable
                columns={columns}
                rows={rows}
                loading={loading}
            />

            <CreateRewardModal
                open={openCreate}
                onClose={() => setOpenCreate(false)}
            />
        </Box>
    );
}
