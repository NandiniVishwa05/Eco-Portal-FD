import { Stack, Typography, Button } from "@mui/material";
import { Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import EcoInput from "../../components/common/EcoInput";
import { otpSchema } from "../../features/auth/passwordResetValidation";
import { verifyOtp } from "../../services/authService";

export default function VerifyOtp() {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state?.identifier || !state?.role) {
        navigate("/");
        return null;
    }

    return (
        <AuthLayout showBack roleLabel="Verify OTP">
            <Formik
                initialValues={{ otp: "" }}
                validationSchema={otpSchema}
                onSubmit={async (values) => {
                    const response = await verifyOtp({
                        user_type: state.role === "individual" ? "individual" : "organization",
                        organization_type: state.role,
                        ...state.identifier,
                        otp: values.otp
                    });
                    navigate("/auth/set-password", {
                        state: { reset_token: response.data.reset_token, identifier: state.identifier, role: state.role }
                    });
                }}
            >
                {({ values, errors, touched, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <Typography fontSize={22} fontWeight={800}>
                                Enter OTP
                            </Typography>

                            <EcoInput
                                name="otp"
                                label="OTP"
                                placeholder="6-digit OTP"
                                value={values.otp}
                                onChange={handleChange}
                                error={touched.otp && Boolean(errors.otp)}
                                helperText={touched.otp && errors.otp}
                            />

                            <Button type="submit" variant="contained" size="large">
                                Verify OTP
                            </Button>
                        </Stack>
                    </form>
                )}
            </Formik>
        </AuthLayout>
    );
}
