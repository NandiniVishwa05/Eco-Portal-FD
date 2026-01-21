import {
    Stack,
    Typography,
    Button,
    FormControlLabel,
    Switch,
    Checkbox
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import AuthLayout from "./AuthLayout";
import EcoInput from "../../components/common/EcoInput";
import EcoPasswordInput from "../../components/common/EcoPasswordInput";
import { AUTH_CONFIG } from "../../features/auth/authConfig";
import { signupSchemas } from "../../features/auth/signupValidation";
import { signupInitialValues } from "../../features/auth/signupInitialValues";
import { signup } from "../../services/authService";
import { useState } from "react";
import FullScreenLoader from "../../components/common/FullScreenLoader"
import { CheckBox } from "@mui/icons-material";
import EcoAlert from "../../components/common/EcoAlertDialog";
export default function Signup() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const role = state?.role;
    const config = AUTH_CONFIG[role];
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");
    const [alert, setAlert] = useState({
        open: false,
        type: "success",
        message: ""
    });

    if (!config || !config.allowSignup) {
        navigate("/");
        return null;
    }

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const payload = {
                organization_type: role,
                user_type: role === "individual" ? "individual" : "organization",

                // map fields explicitly
                name: role === "individual" ? values.fullName : values.organizationName,

                email: values.email,
                age: values.age,
                aadhar_id: values.aadhaar,
                gstin_number: values.gstin,
                city: values.city,
                area: values.area,
                pincode: values.pincode,
                password: values.password
            };

            setLoading(true);
            setLoadingMessage("Creating account...");
            await signup(payload);
            setAlert({
                open: true,
                type: "success",
                message: "Account created successfully"
            });

            // success → redirect
            setTimeout(() => {
                navigate("/", { state: { role } });
            }, 3000);

        } catch (error) {
            const backendMessage =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                "Something went wrong. Please try again.";

            setAlert({
                open: true,
                type: "error",
                message: backendMessage
            });

            if (error.response?.data?.errors) {
                // field-level errors from backend
                setErrors(error.response.data.errors);
            } else if (error.response?.data?.message) {
                // general error
                setErrors({ email: error.response.data.message });
            }
        } finally {
            setLoading(false);
            setLoadingMessage("");
            setSubmitting(false);
        }
    };

    return (
        <>
            <EcoAlert
                open={alert.open}
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert({ ...alert, open: false })}
            />
            <AuthLayout
                showBack
                roleLabel={`${role} account`}
                roleDescription="Create a verified account to access EcoPortal services."
            >
                <FullScreenLoader
                    open={loading}
                    message={loadingMessage}
                />
                <Stack spacing={3}>
                    <Typography fontSize={26} fontWeight={800}>
                        Create account
                    </Typography>

                    <Formik
                        initialValues={signupInitialValues[role]}
                        validationSchema={signupSchemas[role]}
                        onSubmit={handleSubmit}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleSubmit
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={2}>
                                    {/* Individual */}
                                    {role === "individual" && (
                                        <>
                                            <EcoInput
                                                name="fullName"
                                                label="Full name"
                                                placeholder="Enter your full name"
                                                value={values.fullName}
                                                onChange={handleChange}
                                                error={touched.fullName && Boolean(errors.fullName)}
                                                helperText={touched.fullName && errors.fullName}
                                            />

                                            <EcoInput
                                                name="email"
                                                label="Email"
                                                placeholder="Enter your email"
                                                value={values.email}
                                                onChange={handleChange}
                                                error={touched.email && Boolean(errors.email)}
                                                helperText={touched.email && errors.email}
                                            />

                                            <EcoInput
                                                name="age"
                                                label="Age"
                                                placeholder="Enter your age"
                                                value={values.age}
                                                onChange={handleChange}
                                                error={touched.age && Boolean(errors.age)}
                                                helperText={touched.age && errors.age}
                                            />

                                            <EcoInput
                                                name="aadhaar"
                                                label="Aadhar ID / PAN"
                                                placeholder="12-digit Aadhaar number"
                                                value={values.aadhaar}
                                                onChange={handleChange}
                                                error={touched.aadhaar && Boolean(errors.aadhaar)}
                                                helperText={touched.aadhaar && errors.aadhaar}
                                            />
                                            <EcoPasswordInput
                                                name="password"
                                                placeholder="Create password"
                                                value={values.password}
                                                onChange={handleChange}
                                                error={touched.password && Boolean(errors.password)}
                                                helperText={touched.password && errors.password}
                                            />
                                            <EcoPasswordInput
                                                name="confirmPassword"
                                                placeholder="Confirm password"
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                                error={
                                                    touched.confirmPassword &&
                                                    Boolean(errors.confirmPassword)
                                                }
                                                helperText={
                                                    touched.confirmPassword &&
                                                    errors.confirmPassword
                                                }
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        name="receiveRewardsNotifications"
                                                        checked={values.receiveRewardsNotifications}
                                                        onChange={handleChange}
                                                    />
                                                }
                                                label="Receive Rewards Notifications"
                                            />

                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="acceptTerms"
                                                        checked={values.acceptTerms}
                                                        onChange={handleChange}
                                                    />
                                                }
                                                label="Accept Terms & Privacy Policy"
                                            />

                                            <Typography color="error" fontSize={12}>
                                                {touched.acceptTerms && errors.acceptTerms}
                                            </Typography>
                                        </>
                                    )}

                                    {role !== "individual" && (
                                        <>
                                            <EcoInput
                                                name="organizationName"
                                                label="Organization name"
                                                placeholder="Enter organization name"
                                                value={values.organizationName}
                                                onChange={handleChange}
                                                error={
                                                    touched.organizationName &&
                                                    Boolean(errors.organizationName)
                                                }
                                                helperText={
                                                    touched.organizationName &&
                                                    errors.organizationName
                                                }
                                            />

                                            <EcoInput
                                                name="email"
                                                label="Email"
                                                placeholder="Enter email"
                                                value={values.email}
                                                onChange={handleChange}
                                                error={touched.email && Boolean(errors.email)}
                                                helperText={touched.email && errors.email}
                                            />

                                            <EcoInput
                                                name="gstin"
                                                label="GSTIN"
                                                placeholder={
                                                    role === "seller"
                                                        ? "GSTIN (optional)"
                                                        : "15-character GSTIN"
                                                }
                                                value={values.gstin}
                                                onChange={handleChange}
                                                error={touched.gstin && Boolean(errors.gstin)}
                                                helperText={touched.gstin && errors.gstin}
                                            />

                                            <EcoInput
                                                name="city"
                                                label="City"
                                                placeholder="Enter city name"
                                                value={values.city}
                                                onChange={handleChange}
                                                error={touched.city && Boolean(errors.city)}
                                                helperText={touched.city && errors.city}
                                            />

                                            <EcoInput
                                                name="area"
                                                label="Area"
                                                placeholder="Enter area (optional)"
                                                value={values.area}
                                                onChange={handleChange}
                                                error={touched.area && Boolean(errors.area)}
                                                helperText={touched.area && errors.area}
                                            />

                                            <EcoInput
                                                name="pincode"
                                                label="Pincode"
                                                placeholder="6-digit pincode"
                                                value={values.pincode}
                                                onChange={handleChange}
                                                error={touched.pincode && Boolean(errors.pincode)}
                                                helperText={touched.pincode && errors.pincode}
                                            />
                                            <EcoInput
                                                name="websiteLink"
                                                label="Website Link"
                                                placeholder="https://example.com"
                                                value={values.websiteLink}
                                                onChange={handleChange}
                                                error={touched.websiteLink && Boolean(errors.websiteLink)}
                                                helperText={touched.websiteLink && errors.websiteLink}
                                            />
                                            <EcoPasswordInput
                                                name="password"
                                                placeholder="Create password"
                                                value={values.password}
                                                onChange={handleChange}
                                                error={touched.password && Boolean(errors.password)}
                                                helperText={touched.password && errors.password}
                                            />

                                            <EcoPasswordInput
                                                name="confirmPassword"
                                                placeholder="Confirm password"
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                                error={
                                                    touched.confirmPassword &&
                                                    Boolean(errors.confirmPassword)
                                                }
                                                helperText={
                                                    touched.confirmPassword &&
                                                    errors.confirmPassword
                                                }
                                            />
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="space-between"
                                            >
                                                <Typography fontSize={14}>
                                                    Participate in EcoPoints Program
                                                </Typography>

                                                <Switch
                                                    name="participateEcoPoints"
                                                    checked={values.participateEcoPoints}
                                                    onChange={handleChange}
                                                />
                                            </Stack>

                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="space-between"
                                            >
                                                <Typography fontSize={14}>
                                                    Receive Eco Updates & Alerts
                                                </Typography>

                                                <Switch
                                                    name="receiveEcoUpdates"
                                                    checked={values.receiveEcoUpdates}
                                                    onChange={handleChange}
                                                />
                                            </Stack>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="agreeCarbonDisclosure"
                                                        checked={values.agreeCarbonDisclosure}
                                                        onChange={handleChange}
                                                    />
                                                }
                                                label="Agree to Carbon Data Disclosure"
                                            />
                                            <Typography color="error" fontSize={12}>
                                                {touched.agreeCarbonDisclosure && errors.agreeCarbonDisclosure}
                                            </Typography>
                                        </>
                                    )}
                                    {/* Passwords */}


                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        sx={{
                                            mt: 1,
                                            py: 1.4,
                                            fontWeight: 700,
                                            borderRadius: "12px"
                                        }}
                                    >
                                        Create account
                                    </Button>
                                </Stack>
                            </form>
                        )}
                    </Formik>
                </Stack>
            </AuthLayout>
        </>
    );
}
