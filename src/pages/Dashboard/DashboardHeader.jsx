import { useState } from "react";
import { useSelector } from "react-redux";
import { Stack, Typography, Button, Box } from "@mui/material";
import CreateProductModal from "./tabs/Products/CreateProductModal";
import { useTheme } from "@mui/material";
import { logout } from "../../services/authService";
import { logout as logoutAction } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";

export default function DashboardHeader({ title }) {
    const { user, userType } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [openCreateProduct, setOpenCreateProduct] = useState(false);
    const theme = useTheme();
    const identifier =
        userType === "government"
            ? user.state_code
            : userType === "individual"
                ? user.aadhar_id
                : user.email || user.gstin_number;

    return (
        <>
            <Stack
                // direction="row"
                // justifyContent="space-between"
                // alignItems="center"
                sx={{
                    mb: 1.5,
                    // height: "118px"
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={0.5}
                >
                    <Box>
                        <Typography variant="h5" fontWeight={800} >
                            {title}
                        </Typography>
                        <Typography fontSize={13} color="text.secondary">
                            Analytics · Activities · Leaderboards · Hotspots · Rewards
                        </Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                        {userType !== "government" && (
                            <Button
                                variant="contained"
                                sx={{
                                    background: theme.custom.gradients.button,
                                    borderRadius: "12px",
                                    border: "1px solid #ebebebff",
                                    color: theme.palette.text.primary,
                                    p: "6px 10px"
                                }}
                                onClick={() => setOpenCreateProduct(true)}
                            >
                                QR Scan
                            </Button>
                        )}
                        {userType === "organization" && user?.organization_type !== "college" && (
                            <Button
                                variant="contained"
                                onClick={() => setOpenCreateProduct(true)}
                                sx={{
                                    borderRadius: "12px",
                                    p: "6px 10px",
                                    textTransform: "none",
                                    fontWeight: 600
                                }}
                            >
                                Create Product
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: theme.custom.heatmap.high,
                                borderRadius: "12px",
                                p: "6px 14px",
                                textTransform: "none",
                                fontWeight: 600
                            }}
                            onClick={() => {
                                logout();
                                dispatch(logoutAction());
                            }}
                        >
                            Logout
                        </Button>
                    </Stack>
                </Stack>
                <Stack
                    mt={1.5}
                    direction="row"
                    alignItems="center"
                    // justifyContent="center"
                    sx={{
                        boxShadow: theme.shadows[0],
                        p: "12px",
                        borderRadius: "12px",
                        border: "1px solid #06281e08",
                        background: theme.custom.gradients.card,
                        height: "118px"
                    }}
                >
                    <Stack direction="row" spacing={1.5}>
                        <Box
                            sx={{
                                width: "72px",
                                height: "72px",
                                borderRadius: "12px",
                                overflow: "hidden",
                                background: theme.custom.gradients.logo
                            }}
                        >
                            <img src="" alt="" />
                        </Box>
                        <Box>
                            <Typography variant="h6" fontWeight={700}>
                                {user?.name}
                            </Typography>

                            <Typography fontSize={12} color="text.secondary">
                                {identifier}
                            </Typography>
                        </Box>
                    </Stack>
                </Stack>


            </Stack >

            <CreateProductModal
                open={openCreateProduct}
                onClose={() => setOpenCreateProduct(false)}
            />
        </>
    );
}
