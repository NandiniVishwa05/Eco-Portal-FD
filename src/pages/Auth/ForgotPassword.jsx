import { Stack, Typography, Button } from "@mui/material";
import { Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import EcoInput from "../../components/common/EcoInput";
import { forgotPasswordSchemas } from "../../features/auth/passwordResetValidation";
import { sendResetOtp } from "../../services/authService";
import { useState } from "react";
import FullScreenLoader from "../../components/common/FullScreenLoader";
import EcoAlert from "../../components/common/EcoAlertDialog";

export default function ForgotPassword() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(true);
    const [alert, setAlert] = useState({
        open: false,
        type: "success",
        message: ""
    });

    const role = state?.role;

    if (!role) {
        navigate("/");
        return null;
    }

    const getFieldConfig = () => {
        if (role === "individual") {
            return { name: "aadhar_id", label: "Aadhar ID / PAN", placeholder: "12-digit Aadhar" };
        }
        if (role === "seller") {
            return { name: "email", label: "Email", placeholder: "Registered email" };
        }
        return { name: "gstin_number", label: "GSTIN", placeholder: "15-character GSTIN" };
    };

    const field = getFieldConfig();
    const schema =
        role === "individual"
            ? forgotPasswordSchemas.individual
            : role === "seller"
                ? forgotPasswordSchemas.seller
                : forgotPasswordSchemas.organization;

    return (
        <>
            <EcoAlert
                open={alert.open}
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert({ ...alert, open: false })}
            />
            <AuthLayout showBack roleLabel="Reset password">
                <FullScreenLoader
                    open={loading}
                    message={loadingMessage}
                />
                <Formik
                    initialValues={{ [field.name]: "" }}
                    validationSchema={schema}
                    onSubmit={async (values) => {
                        try {
                            setLoading(true);
                            setLoadingMessage("Sending otp...");
                            await sendResetOtp({
                                user_type: state.role === "individual" ? "individual" : "organization",
                                organization_type: state.role,
                                ...values
                            });
                            setAlert({
                                open: true,
                                type: "success",
                                message: "OTP sent successfully"
                            });
                            navigate("/auth/verify-otp", {
                                state: { role, identifier: values }
                            });
                        } catch (error) {
                            console.error("Error sending reset OTP:", error);
                            const backendMessage =
                                error?.response?.data?.error ||
                                error?.response?.data?.message ||
                                "Error sending reset OTP.";

                            setAlert({
                                open: true,
                                type: "error",
                                message: backendMessage
                            });
                        } finally {
                            setLoading(false);
                        }
                    }}
                >
                    {({ values, errors, touched, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={2}>
                                <Typography fontSize={22} fontWeight={800}>
                                    Forgot password
                                </Typography>

                                <EcoInput
                                    name={field.name}
                                    label={field.label}
                                    placeholder={field.placeholder}
                                    value={values[field.name]}
                                    onChange={handleChange}
                                    error={touched[field.name] && Boolean(errors[field.name])}
                                    helperText={touched[field.name] && errors[field.name]}
                                />

                                <Button type="submit" variant="contained" size="large">
                                    Send OTP
                                </Button>
                            </Stack>
                        </form>
                    )}
                </Formik>
            </AuthLayout>
        </>
    );
}
