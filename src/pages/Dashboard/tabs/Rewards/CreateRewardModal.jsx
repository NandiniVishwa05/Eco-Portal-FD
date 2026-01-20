import {
    Dialog,
    DialogTitle,
    DialogContent,
    Stack,
    Button,
    Switch,
    FormControlLabel
} from "@mui/material";
import { Formik } from "formik";
import EcoInput from "../../../../components/common/EcoInput";
import { createRewardSchema } from "./createRewardSchema";
import { createRewardInitialValues } from "./createRewardInitial";
import { createReward } from "../../../../services/rewardService";
import FullScreenLoader from "../../../../components/common/FullScreenLoader";
import { useState } from "react";

export default function CreateRewardModal({
    open,
    onClose,
    onSuccess,
    onError,
}) {

    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");
    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            setLoading(true);
            setLoadingMessage("Creating reward...");
            await createReward(values);
            onSuccess("Reward created successfully");
            onClose();
        } catch (error) {
            onError(error);
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        } finally {
            setLoading(false);
            setLoadingMessage("");
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <FullScreenLoader open={loading} message={loadingMessage} />
            <DialogTitle>Create Reward</DialogTitle>

            <DialogContent>
                <Formik
                    initialValues={createRewardInitialValues}
                    validationSchema={createRewardSchema}
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
                            <Stack spacing={2} mt={1}>
                                <EcoInput
                                    name="name"
                                    label="Reward name"
                                    value={values.name}
                                    onChange={handleChange}
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={touched.name && errors.name}
                                />

                                <EcoInput
                                    name="ecopoints_required"
                                    label="Ecopoints required"
                                    value={values.ecopoints_required}
                                    onChange={handleChange}
                                    error={
                                        touched.ecopoints_required &&
                                        Boolean(errors.ecopoints_required)
                                    }
                                    helperText={
                                        touched.ecopoints_required &&
                                        errors.ecopoints_required
                                    }
                                />

                                <EcoInput
                                    name="co2_savings"
                                    label="CO₂ Emission"
                                    value={values.co2_savings}
                                    onChange={handleChange}
                                    error={
                                        touched.co2_savings &&
                                        Boolean(errors.co2_savings)
                                    }
                                    helperText={
                                        touched.co2_savings &&
                                        errors.co2_savings
                                    }
                                />

                                <EcoInput
                                    name="description"
                                    label="Reward description"
                                    multiline
                                    rows={3}
                                    value={values.description}
                                    onChange={handleChange}
                                    error={
                                        touched.description &&
                                        Boolean(errors.description)
                                    }
                                    helperText={
                                        touched.description &&
                                        errors.description
                                    }
                                />

                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={values.is_monetary}
                                            onChange={handleChange}
                                            name="is_monetary"
                                        />
                                    }
                                    label="Is Monetary Reward?"
                                />

                                <EcoInput
                                    name="quantity"
                                    label="Quantity"
                                    value={values.quantity}
                                    onChange={handleChange}
                                    error={
                                        touched.quantity &&
                                        Boolean(errors.quantity)
                                    }
                                    helperText={
                                        touched.quantity &&
                                        errors.quantity
                                    }
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    sx={{ mt: 1, fontWeight: 700 }}
                                >
                                    Create Reward
                                </Button>
                            </Stack>
                        </form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
