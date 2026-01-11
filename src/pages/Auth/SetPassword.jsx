import { Stack, Typography, Button } from "@mui/material";
import { Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthLayout from "./AuthLayout";
import EcoInput from "../../components/common/EcoInput";
import { setPasswordSchema } from "../../features/auth/passwordResetValidation";
import { resetPassword } from "../../services/authService";

export default function SetPassword() {
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(state);
        if (!state?.reset_token) {
            navigate("/");
        }
    }, [state, navigate]);

    if (!state?.reset_token) {
        return null; // ⛔ prevent render until redirect
    }

    return (
        <AuthLayout showBack roleLabel="Set Password">
            <Formik
                initialValues={{
                    password: "",
                    confirm_password: ""
                }}
                validationSchema={setPasswordSchema}
                onSubmit={async (values) => {
                    await resetPassword({
                        reset_token: state.reset_token,
                        newPassword: values.password,
                        ...state.identifier,
                        user_type: state.role === "individual" ? "individual" : "organization",
                        organization_type: state.role,
                    });

                    navigate("/");
                }}
            >
                {({ values, errors, touched, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <Typography fontSize={22} fontWeight={800}>
                                Set New Password
                            </Typography>

                            <EcoInput
                                name="password"
                                label="Password"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                            />

                            <EcoInput
                                name="confirm_password"
                                label="Confirm Password"
                                type="password"
                                value={values.confirm_password}
                                onChange={handleChange}
                                error={
                                    touched.confirm_password &&
                                    Boolean(errors.confirm_password)
                                }
                                helperText={
                                    touched.confirm_password &&
                                    errors.confirm_password
                                }
                            />

                            <Button type="submit" variant="contained" size="large">
                                Set Password
                            </Button>
                        </Stack>
                    </form>
                )}
            </Formik>
        </AuthLayout>
    );
}
