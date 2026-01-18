import { Box, Stack, Divider, Button, Typography } from "@mui/material";
import SettingsSidebar from "./SettingsSidebar";
import SettingsSection from "./SettingsSection";
import SettingsRow from "./SettingsRow";
import EcoToggle from "./EcoToggle";
import { useDispatch } from "react-redux";
import { setThemeMode } from "../../../../features/auth/themeSlice";

import EcoInput from "../../../../components/common/EcoInput";
import EcoSelect from "../../../../components/common/EcoSelect";
import { useState } from "react";
import { useSelector } from "react-redux";

const SECTIONS = [
    { id: "account", label: "Account Settings" },
    { id: "sustainability", label: "Sustainability Preferences" },
    { id: "appearance", label: "App Appearance" },
    { id: "privacy", label: "Privacy & Data Control" },
    { id: "security", label: "Security" },
    { id: "recommendations", label: "Content & Recommendations" },
    { id: "localization", label: "Localization" },
    // { id: "experimental", label: "Experimental Features" }
];

export function getInitials(name = "") {
    if (!name) return "";

    return name
        .trim()
        .split(/\s+/)          // split by spaces
        .slice(0, 2)           // take first two words
        .map(word => word[0])  // take first letter
        .join("")
        .toUpperCase();
}


export default function SettingsPage() {
    const mode = useSelector((state) => state.theme.mode);
    const dispatch = useDispatch();
    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };
    const [isEditing, setIsEditing] = useState(false);
    const { user, userType } = useSelector(state => state.auth);
    const [userData, setUserData] = useState({
        name: user?.name || "Karandeep Singh",
        email: user?.email || "karandeep@gmail.com",
        accountType: userType
    });
    return (
        <Box sx={{ display: "flex", height: "calc(100vh - 550px)" }}>
            <SettingsSidebar sections={SECTIONS} onSelect={scrollTo} />

            <Box sx={{ flex: 1, overflowY: "auto", pl: 3 }}>
                <SettingsSection
                    id="account"
                    title="Account Settings"
                    description="Your personal information and account details."
                >
                    <Stack spacing={3}>
                        {/* PROFILE HEADER */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                pb: 2,
                                borderBottom: "1px solid",
                                borderColor: "divider"
                            }}
                        >
                            {/* AVATAR */}
                            <Box
                                sx={{
                                    width: 64,
                                    height: 64,
                                    borderRadius: "14px",
                                    background: (theme) => theme.custom.gradients.logo,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: 700,
                                    fontSize: 22,
                                    color: "primary.main"
                                }}
                            >
                                {getInitials(user?.name)}
                            </Box>

                            {/* BASIC INFO */}
                            <Box sx={{ flex: 1 }}>
                                <Typography fontWeight={600} fontSize={16}>
                                    {user?.name || "Karandeep Singh"}
                                </Typography>

                                <Typography
                                    fontSize={13}
                                    color="text.secondary"
                                    sx={{ mb: 0.5 }}
                                >
                                    {user?.email || "karandeep@gmail.com"}
                                </Typography>

                                <Box
                                    sx={{
                                        display: "inline-block",
                                        px: 1.5,
                                        py: "2px",
                                        borderRadius: 999,
                                        fontSize: 12,
                                        fontWeight: 600,
                                        color: "primary.main",
                                        background: (theme) =>
                                            theme.custom.gradients.soft2
                                    }}
                                >
                                    {user.accountType} Account
                                </Box>
                            </Box>
                        </Box>

                        {/* DETAILS FORM */}
                        <Stack spacing={2}>
                            <EcoInput
                                label="Display Name"
                                onChange={(e) => { setUserData({ ...userData, name: e.target.value }) }}
                                value={userData?.name || "Karandeep Singh"}
                                disabled={!isEditing}
                            />

                            <EcoInput
                                label="Email Address"
                                onChange={(e) => { setUserData({ ...userData, email: e.target.value }) }}
                                value={userData?.email || "karandeep@gmail.com"}
                                disabled={!isEditing}
                            />

                            {/* <EcoInput
                                label="Phone Number"
                                placeholder="Enter phone number"
                                value={user?.phone || ""}
                                disabled={!isEditing}
                            /> */}

                            <EcoSelect
                                label="Account Type"
                                onChange={(e) => { setUserData({ ...userData, accountType: e.target.value }) }}
                                value={userType}
                                disabled={!isEditing}
                                options={[
                                    { value: "individual", label: "Individual" },
                                    { value: "manufacturer", label: "Manufacturer" },
                                    { value: "retailer", label: "Retailer" },
                                    { value: "seller", label: "Seller" },
                                    { value: "college", label: "College" },
                                    { value: "institution", label: "Institution" }
                                ]}
                            />

                            {/* ACTION BUTTONS */}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    gap: 1,
                                    mt: 1
                                }}
                            >
                                {!isEditing ? (
                                    <Button
                                        sx={{
                                            borderRadius: "12px"
                                        }}
                                        variant="outlined"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Edit Profile
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            sx={{
                                                borderRadius: "12px"
                                            }}
                                            variant="outlined"
                                            color="inherit"
                                            onClick={() => setIsEditing(false)}
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            sx={{
                                                borderRadius: "12px"
                                            }}
                                            variant="contained"
                                            onClick={() => setIsEditing(false)}
                                        >
                                            Save Changes
                                        </Button>
                                    </>
                                )}
                            </Box>
                        </Stack>
                    </Stack>
                </SettingsSection>

                <Divider sx={{ my: 3 }} />

                {/* SUSTAINABILITY */}
                <SettingsSection
                    id="sustainability"
                    title="Sustainability Preferences"
                    description="Control how sustainability information is shown."
                >
                    <Stack spacing={2}>
                        <EcoToggle
                            label="Show eco comparison by default"
                            description="Display eco-friendly comparison cards automatically."
                        />
                        <EcoToggle
                            label="Show lifecycle impact cards"
                            description="Include lifecycle-based impact analysis."
                        />
                        <EcoToggle
                            label="Eco score visibility"
                            description="Show eco score on product cards."
                        />
                    </Stack>
                </SettingsSection>

                <Divider sx={{ my: 3 }} />

                {/* APPEARANCE */}
                <SettingsSection
                    id="appearance"
                    title="App Appearance"
                    description="Customize how EcoPortal looks."
                >
                    <Stack spacing={2}>
                        {/* <EcoSelect
                            label="Theme mode"
                            value={mode}
                            onChange={(e) => dispatch(setThemeMode(e.target.value))}
                            options={[
                                { label: "Light", value: "light" },
                                { label: "Dark", value: "dark" },
                                { label: "System default", value: "system" }
                            ]}
                        /> */}

                        <EcoSelect
                            label="Data visualization density"
                            options={[
                                { label: "Comfortable", value: "comfortable" },
                                { label: "Compact", value: "compact" }
                            ]}
                        />
                    </Stack>
                </SettingsSection>

                <Divider sx={{ my: 3 }} />

                {/* PRIVACY */}
                <SettingsSection
                    id="privacy"
                    title="Privacy & Data Control"
                    description="Manage how your data is used."
                >
                    <Stack spacing={2}>
                        <EcoToggle
                            label="Allow anonymized data usage"
                            description="Help improve eco analytics without revealing identity."
                        />

                        <EcoToggle
                            label="Allow personalized recommendations"
                            description="Use activity data to improve suggestions."
                        />

                        <Button sx={{ borderRadius: "12px" }} variant="outlined">
                            Download My Data
                        </Button>

                        <Button sx={{ borderRadius: "12px" }} color="error">
                            Request Account Deletion
                        </Button>
                    </Stack>
                </SettingsSection>

                <Divider sx={{ my: 3 }} />

                {/* SECURITY */}
                <SettingsSection
                    id="security"
                    title="Security"
                    description="Basic security controls."
                >
                    <Stack spacing={2}>
                        <Button sx={{ borderRadius: "12px" }} variant="outlined">
                            Change Password
                        </Button>

                        <Button sx={{ borderRadius: "12px" }} color="error" variant="outlined">
                            Logout from all devices
                        </Button>
                    </Stack>
                </SettingsSection>

                <Divider sx={{ my: 3 }} />

                {/* RECOMMENDATIONS */}
                <SettingsSection
                    id="recommendations"
                    title="Content & Recommendations"
                    description="Control recommendation behavior."
                >
                    <Stack spacing={2}>
                        <EcoToggle
                            label="Show recommended eco products"
                            description="Display recommended products across the app."
                        />

                        <EcoSelect
                            label="Recommendation basis"
                            options={[
                                { label: "CO₂ Impact", value: "co2" },
                                { label: "Eco Score", value: "eco_score" },
                                { label: "Popularity", value: "popularity" }
                            ]}
                        />
                    </Stack>
                </SettingsSection>

                <Divider sx={{ my: 3 }} />

                {/* LOCALIZATION */}
                <SettingsSection
                    id="localization"
                    title="Localization"
                    description="Language preferences."
                >
                    <EcoSelect
                        label="Language"
                        options={["English", "Hindi"]}
                    />
                </SettingsSection>

                {/* <Divider sx={{ my: 3 }} /> */}

                {/* EXPERIMENTAL */}
                {/* <SettingsSection
                    id="experimental"
                    title="Experimental Features"
                    description="Try upcoming features early."
                >
                    <Stack spacing={2}>
                        <EcoToggle
                            label="Enable beta features"
                            description="Access features still in testing."
                        />

                        <Button disabled variant="outlined">
                            AI-powered insights (Coming soon)
                        </Button>

                        <Button disabled variant="outlined">
                            Smart eco nudges (Coming soon)
                        </Button>
                    </Stack>
                </SettingsSection> */}
            </Box>
        </Box>
    );
}
