import { useState } from "react";
import { useSelector } from "react-redux";
import { Stack, Typography, Button, Box } from "@mui/material";
import CreateProductModal from "./tabs/Products/CreateProductModal";
import QRScannerModal from "./QRScannerModal";
import { useTheme } from "@mui/material";
import { logout } from "../../services/authService";
import { logout as logoutAction } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { DASHBOARD_CONFIG } from "./dashboardConfig";
import EcoAlert from "../../components/common/EcoAlertDialog";
// import QRScannerModal from "./QRScannerModal";
import {
    IconButton,
    Menu,
    MenuItem,
    useMediaQuery
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function DashboardHeader({ title }) {
    const { user, userType } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [openCreateProduct, setOpenCreateProduct] = useState(false);
    const [openQRScanner, setOpenQRScanner] = useState(false);
    const theme = useTheme();
    const { role } = useParams();
    const config = DASHBOARD_CONFIG[role];
    const [alert, setAlert] = useState({
        open: false,
        type: "success",
        message: ""
    });
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [menuAnchor, setMenuAnchor] = useState(null);

    const identifier =
        userType === "government"
            ? user.state_code
            : userType === "individual"
                ? user.aadhar_id
                : user.email || user.gstin_number;

    const handleQRScanSuccess = (decodedText) => {
        console.log("QR Code scanned:", decodedText);
        // Add your logic here - e.g., navigate to product page, show product details, etc.
        // Example: navigate(`/product/${decodedText}`);
    };

    function getInitials(name = "") {
        if (!name) return "";

        return name
            .trim()
            .split(/\s+/)          // split by spaces
            .slice(0, 2)           // take first two words
            .map(word => word[0])  // take first letter
            .join("")
            .toUpperCase();
    }


    return (
        <>
            <EcoAlert
                open={alert.open}
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert({ ...alert, open: false })}
            />
            <Stack
                sx={{
                    mb: 1.5,
                }}
            >
                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box>
                        <Typography variant="h5" fontWeight={800}>
                            {title}
                        </Typography>
                        <Typography fontSize={13} color="text.secondary">
                            Analytics · Activities · Leaderboards · Hotspots · Rewards
                        </Typography>
                    </Box>
                    {!isMobile && (
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
                                    onClick={() => setOpenQRScanner(true)}
                                >
                                    QR Scan
                                </Button>
                            )}
                            {userType !== "government" && (
                                <Button
                                    variant="contained"
                                    component={NavLink}
                                    to={`/dashboard/${role}/settings`}
                                    sx={{
                                        background: theme.custom.gradients.button,
                                        borderRadius: "12px",
                                        border: "1px solid #ebebebff",
                                        color: theme.palette.text.primary,
                                        p: "6px 10px"
                                    }}
                                // onClick={() => setOpenQRScanner(true)}
                                >
                                    Settings
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
                    )}
                    {isMobile && (
                        <>
                            <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
                                <MoreVertIcon />
                            </IconButton>

                            <Menu
                                anchorEl={menuAnchor}
                                open={Boolean(menuAnchor)}
                                onClose={() => setMenuAnchor(null)}
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                transformOrigin={{ vertical: "top", horizontal: "right" }}
                            >
                                {userType !== "government" && (
                                    <MenuItem onClick={() => {
                                        setMenuAnchor(null);
                                        setOpenQRScanner(true);
                                    }}>
                                        QR Scan
                                    </MenuItem>
                                )}

                                {userType !== "government" && (
                                    <MenuItem
                                        component={NavLink}
                                        to={`/dashboard/${role}/settings`}
                                        onClick={() => setMenuAnchor(null)}
                                    >
                                        Settings
                                    </MenuItem>
                                )}

                                {userType === "organization" &&
                                    user?.organization_type !== "college" && (
                                        <MenuItem onClick={() => {
                                            setMenuAnchor(null);
                                            setOpenCreateProduct(true);
                                        }}>
                                            Create Product
                                        </MenuItem>
                                    )}

                                <MenuItem onClick={() => {
                                    setMenuAnchor(null);
                                    logout();
                                    dispatch(logoutAction());
                                }}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </Stack>
                <Stack
                    mt={1.5}
                    direction="row"
                    alignItems="center"
                    sx={{
                        boxShadow: theme.shadows[0],
                        p: { xs: "10px", sm: "12px" },
                        height: { xs: "auto", sm: "118px" },
                        gap: 1.5,
                        borderRadius: "12px",
                        border: "1px solid #06281e08",
                        background: theme.custom.gradients.card,
                    }}
                >
                    <Stack direction="row" spacing={1.5}>
                        <Box
                            sx={{
                                width: { xs: 56, sm: 72 },
                                height: { xs: 56, sm: 72 },
                                fontSize: { xs: 18, sm: 22 },
                                borderRadius: "14px",
                                background: (theme) => theme.custom.gradients.logo,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 700,
                                color: "primary.main"
                            }}
                        >
                            {getInitials(user?.name)}
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
            </Stack>

            <CreateProductModal
                open={openCreateProduct}
                onClose={() => setOpenCreateProduct(false)}
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

            <QRScannerModal
                open={openQRScanner}
                onClose={() => setOpenQRScanner(false)}
                onScanSuccess={handleQRScanSuccess}
            />
        </>
    );
}