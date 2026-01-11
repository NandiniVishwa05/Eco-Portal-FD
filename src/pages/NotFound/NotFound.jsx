import { Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../Auth/AuthLayout";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <AuthLayout
            showBack={false}
            roleLabel="Page not found"
            roleDescription="The page you are looking for doesn’t exist or may have been moved."
        >
            <Stack
                spacing={3}
                alignItems="center"
                textAlign="center"
                sx={{ py: 2 }}
            >
                {/* 404 Title */}
                <Typography
                    fontSize={72}
                    fontWeight={900}
                    color="primary.main"
                    lineHeight={1}
                >
                    404
                </Typography>

                {/* Subtitle */}
                <Typography
                    fontSize={22}
                    fontWeight={800}
                    color="text.primary"
                >
                    Oops! Page not found
                </Typography>

                {/* Description */}
                <Typography
                    fontSize={14}
                    color="text.secondary"
                    maxWidth={420}
                >
                    The page you’re trying to access doesn’t exist, was removed,
                    or you may not have permission to view it.
                </Typography>

                {/* Actions */}
                <Stack spacing={1.5} width="100%" maxWidth={320}>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            py: 1.4,
                            fontWeight: 700,
                            borderRadius: "12px"
                        }}
                        onClick={() => navigate("/")}
                    >
                        Go to Home
                    </Button>

                    <Button
                        variant="outlined"
                        size="large"
                        sx={{
                            py: 1.4,
                            fontWeight: 700,
                            borderRadius: "12px"
                        }}
                        onClick={() => navigate("/auth/login")}
                    >
                        Go to Login
                    </Button>
                </Stack>
            </Stack>
        </AuthLayout>
    );
}
