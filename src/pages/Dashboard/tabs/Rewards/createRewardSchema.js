import * as Yup from "yup";

export const createRewardSchema = Yup.object({
    name: Yup.string()
        .required("Reward name is required")
        .min(3, "Minimum 3 characters"),

    ecopoints_required: Yup.number()
        .typeError("Must be a number")
        .positive("Must be positive")
        .required("Ecopoints required"),

    co2_savings: Yup.number()
        .typeError("Must be a number")
        .positive("Must be positive")
        .required("CO₂ savings required"),

    description: Yup.string()
        .required("Description is required")
        .min(10, "Minimum 10 characters"),

    is_monetary: Yup.boolean(),

    quantity: Yup.number()
        .typeError("Must be a number")
        .integer("Must be an integer")
        .positive("Must be positive")
        .required("Quantity is required")
});
