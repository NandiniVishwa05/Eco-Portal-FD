import {
    Stack,
    Typography,
    Button
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Formik } from "formik";
import { useState } from "react";
import AuthLayout from "./AuthLayout";
import { AUTH_CONFIG } from "../../features/auth/authConfig";
import EcoInput from "../../components/common/EcoInput";
import EcoPasswordInput from "../../components/common/EcoPasswordInput";
import { getUserInfo, login } from "../../services/authService";
import { loginSuccess } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import FullScreenLoader from "../../components/common/FullScreenLoader";

export default function Login() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");
    const dispatch = useDispatch();
    const [error, setError] = useState(null);

    const role = state?.role;
    const config = AUTH_CONFIG[role];

    if (!config) {
        navigate("/");
        return null;
    }

    const resolveUserType = (role) => {
        if (role === "individual") return "individual";
        if (role === "government") return "government";
        return "organization";
    };

    const resolveIdentifierKey = (role) => {
        if (role === "individual") return "aadhar_id";
        if (role === "government") return "state_code";
        if (role === "seller") return "email";
        return "gstin_number";
    };


    const userType = resolveUserType(role);
    const identifierKey = resolveIdentifierKey(role);

    return (
        <AuthLayout
            showBack
            roleLabel="Government Access"
            roleDescription="Monitor statewide sustainability metrics, live activity maps, and policy-driven impact analytics."
        >
            <FullScreenLoader
                open={loading}
                message={loadingMessage}
            />
            <Formik
                initialValues={{
                    identifier: "",
                    password: ""
                }}
                onSubmit={async (values) => {
                    try {
                        setError(null);
                        setLoading(true);
                        setLoadingMessage("Checking credentials...");
                        const response = await login({
                            user_type: userType,
                            ...(userType === "organization" && { organization_type: role }),
                            [identifierKey]: values.identifier,
                            password: values.password
                        });

                        const res2 = await getUserInfo();
                        console.log(res2);
                        console.log("Control came here");

                        dispatch(loginSuccess(response));
                        navigate("/dashboard");

                    } catch (err) {
                        setError("Invalid credentials");
                    } finally {
                        setLoading(false);
                    }
                }}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            {/* Title */}
                            <Typography
                                fontSize={26}
                                fontWeight={800}
                                color="text.primary"
                            >
                                Sign in
                            </Typography>

                            {/* Form */}
                            <Stack spacing={2}>
                                <EcoInput
                                    name="identifier"
                                    label={config.identifierLabel}
                                    placeholder="Enter your registered ID"
                                    value={values.identifier}
                                    onChange={handleChange}
                                    error={Boolean(error)}
                                    helperText={error}
                                />

                                <EcoPasswordInput
                                    name="password"
                                    placeholder="Enter your password"
                                    value={values.password}
                                    onChange={handleChange}
                                    error={Boolean(error)}
                                />
                            </Stack>

                            {/* CTA */}
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{
                                    py: 1.4,
                                    fontWeight: 700,
                                    borderRadius: "12px"
                                }}
                            >
                                Continue
                            </Button>

                            {/* Forgot password */}
                            <Typography
                                fontSize={13}
                                color="primary.main"
                                sx={{ cursor: "pointer" }}
                                onClick={() =>
                                    navigate("/auth/forgot-password", {
                                        state: { role }
                                    })
                                }
                            >
                                Forgot password?
                            </Typography>

                            {/* Signup */}
                            {config.allowSignup && (
                                <Typography fontSize={13} color="text.secondary">
                                    New here?{" "}
                                    <span
                                        style={{
                                            color: theme.palette.primary.main,
                                            fontWeight: 700,
                                            cursor: "pointer"
                                        }}
                                        onClick={() =>
                                            navigate("/auth/signup", {
                                                state: { role }
                                            })
                                        }
                                    >
                                        Create an account
                                    </span>
                                </Typography>
                            )}
                        </Stack>
                    </form>
                )}
            </Formik>
        </AuthLayout>
    );
}
