import * as Yup from "yup";

export const forgotPasswordSchemas = {
    individual: Yup.object({
        aadhar_id: Yup.string()
            .length(12, "Aadhar must be 12 digits")
            .required("Aadhar ID is required")
    }),

    organization: Yup.object({
        gstin_number: Yup.string()
            .matches(/^[0-9A-Z]{15}$/, "GSTIN must be 15 characters")
            .required("GSTIN is required")
    }),

    seller: Yup.object({
        email: Yup.string()
            .email("Enter a valid email")
            .required("Email is required")
    })
};

export const otpSchema = Yup.object({
    otp: Yup.string()
        .matches(/^\d{6}$/, "OTP must be 6 digits")
        .required("OTP is required")
});

export const resetPasswordSchema = Yup.object({
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Confirm password is required")
});

export const setPasswordSchema = Yup.object({
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),

    confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Confirm password is required"),
});