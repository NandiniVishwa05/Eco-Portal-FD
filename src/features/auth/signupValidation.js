import * as Yup from "yup";

/* Common Validators */
const email = Yup.string()
    .email("Enter a valid email address")
    .required("Email is required");

const password = Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required");

const confirmPassword = Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required");

const aadhaar = Yup.string()
    // .matches(/^\d{12}$/, "Aadhaar must be exactly 12 digits")
    .required("Aadhaar ID is required");

const gstin = Yup.string()
    .matches(/^[0-9A-Z]{15}$/, "GSTIN must be exactly 15 characters")
    .required("GSTIN is required");

const pincode = Yup.string()
    .matches(/^\d{6}$/, "Pincode must be exactly 6 digits")
    .required("Pincode is required");

const city = Yup.string().required("City is required");
const area = Yup.string().nullable();

/* Schemas */
export const signupSchemas = {
    individual: Yup.object({
        fullName: Yup.string().required("Full name is required"),
        email,
        age: Yup.number()
            .typeError("Age must be a number")
            .min(1, "Invalid age")
            .required("Age is required"),
        aadhaar,
        password,
        confirmPassword,
        acceptTerms: Yup.boolean()
            .oneOf([true], "You must accept Terms & Privacy Policy")
    }),

    manufacturer: Yup.object({
        organizationName: Yup.string().required("Organization name is required"),
        email,
        gstin,
        city,
        area,
        pincode,
        password,
        confirmPassword,
        agreeCarbonDisclosure: Yup.boolean()
            .oneOf([true], "Carbon data disclosure is required")
    }),

    retailer: Yup.object({
        organizationName: Yup.string().required("Organization name is required"),
        email,
        gstin,
        city,
        area,
        pincode,
        password,
        confirmPassword,
        agreeCarbonDisclosure: Yup.boolean()
            .oneOf([true], "Carbon data disclosure is required")
    }),

    institution: Yup.object({
        organizationName: Yup.string().required("Organization name is required"),
        email,
        gstin,
        city,
        area,
        pincode,
        password,
        confirmPassword,
        agreeCarbonDisclosure: Yup.boolean()
            .oneOf([true], "Carbon data disclosure is required")
    }),

    college: Yup.object({
        organizationName: Yup.string().required("Organization name is required"),
        email,
        gstin,
        city,
        area,
        pincode,
        password,
        confirmPassword,
        agreeCarbonDisclosure: Yup.boolean()
            .oneOf([true], "Carbon data disclosure is required")
    }),

    seller: Yup.object({
        organizationName: Yup.string().required("Organization name is required"),
        email,
        gstin: Yup.string()
            .matches(/^[0-9A-Z]{15}$/, "GSTIN must be 15 characters")
            .nullable(),
        city,
        area,
        pincode,
        password,
        confirmPassword,
        agreeCarbonDisclosure: Yup.boolean()
            .oneOf([true], "Carbon data disclosure is required")
    })
};
