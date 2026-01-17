import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stack,
    IconButton,
    Divider,
    Typography,
    Box,
    Avatar
} from "@mui/material";
import { Add, Delete, Close } from "@mui/icons-material";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";

import EcoInput from "../../../../components/common/EcoInput";
import EcoSelect from "../../../../components/common/EcoSelect";
import { createProduct } from "../../../../services/productService";
import { useState } from "react";
import FullScreenLoader from "../../../../components/common/FullScreenLoader";

const IMPACT_OPTIONS = [
    "Paper",
    "Metal",
    "Plastic",
    "Energy Saving",
    "Plantation",
    "Reuse",
    "Glass",
    "Organic",
    "Cloth"
];

const initialValues = {
    name: "",
    impact_category: "",
    price: "",
    ecopoints: "",
    co2_savings: "",
    plastic_averted: "",
    image: null,

    features: [""],

    summary_message1: "",
    summary_message2: "",
    total_savings_in_percentage: "",

    lifecycle: [
        {
            name: "",
            conventional: "",
            eco_friendly: "",
            impact: ""
        }
    ]
};

const schema = Yup.object({
    name: Yup.string().required(),
    impact_category: Yup.string().required(),
    price: Yup.number().required(),
    ecopoints: Yup.number().required(),
    co2_savings: Yup.number().required(),
    plastic_averted: Yup.number().required(),
    summary_message1: Yup.string().required(),
    total_savings_in_percentage: Yup.number().required()
});

/* ─────────────────────────── */

const Section = ({ title, subtitle, children }) => (
    <Box>
        <Typography fontSize={17} fontWeight={800}>
            {title}
        </Typography>
        {subtitle && (
            <Typography fontSize={13} color="text.secondary" sx={{ mb: 1 }}>
                {subtitle}
            </Typography>
        )}
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={2}>{children}</Stack>
    </Box>
);

/* ─────────────────────────── */

export default function CreateProductModal({ open, onClose }) {
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setLoading(true);
            setLoadingMessage("Creating product...");
            const formData = new FormData();

            // ───── BASIC FIELDS ─────
            formData.append("name", values.name);
            formData.append("impact_category", values.impact_category);
            formData.append("price", values.price);
            formData.append("ecopoints", values.ecopoints);
            formData.append("co2_savings", values.co2_savings);
            formData.append("plastic_averted", values.plastic_averted);

            // ───── IMAGE ─────
            if (values.image) {
                formData.append("image", values.image);
            }

            // ───── ARRAYS / OBJECTS (STRINGIFY) ─────
            formData.append(
                "features",
                JSON.stringify(values.features.filter(Boolean))
            );

            formData.append(
                "summary",
                JSON.stringify({
                    summary_message1: values.summary_message1,
                    summary_message2: values.summary_message2,
                    total_savings_in_percentage:
                        values.total_savings_in_percentage
                })
            );

            formData.append(
                "lifecycle",
                JSON.stringify(values.lifecycle)
            );

            await createProduct(formData);
            onClose();
        } catch (err) {
            console.error("Create product failed", err);
        } finally {
            setLoading(false);
            setLoadingMessage("");
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <FullScreenLoader open={loading} message={loadingMessage} />
            <DialogTitle fontWeight={800}>
                Create Product
            </DialogTitle>

            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, handleSubmit, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <Stack spacing={4}>
                                {/* ───────── BASIC DETAILS ───────── */}
                                <Section
                                    title="Basic Product Details"
                                    subtitle="Core information about the product"
                                >
                                    <EcoInput
                                        name="name"
                                        label="Product Name"
                                        onChange={handleChange}
                                    />

                                    <EcoSelect
                                        name="impact_category"
                                        label="Impact Category"
                                        options={IMPACT_OPTIONS}
                                        value={values.impact_category}
                                        onChange={handleChange}
                                    />

                                    <Stack direction="row" spacing={2}>
                                        <EcoInput
                                            name="price"
                                            label="Price"
                                            type="number"
                                            onChange={handleChange}
                                        />
                                        <EcoInput
                                            name="ecopoints"
                                            label="EcoPoints"
                                            type="number"
                                            onChange={handleChange}
                                        />
                                    </Stack>

                                    <Stack direction="row" spacing={2}>
                                        <EcoInput
                                            name="co2_savings"
                                            label="CO₂ Savings (kg)"
                                            type="number"
                                            onChange={handleChange}
                                        />
                                        <EcoInput
                                            name="plastic_averted"
                                            label="Plastic Averted (kg)"
                                            type="number"
                                            onChange={handleChange}
                                        />
                                    </Stack>

                                    {/* IMAGE UPLOAD */}
                                    <Box
                                        sx={{
                                            border: "1px dashed #cfd8dc",
                                            borderRadius: "14px",
                                            p: 2
                                        }}
                                    >
                                        {values.image ? (
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                <Avatar
                                                    src={URL.createObjectURL(values.image)}
                                                    variant="rounded"
                                                    sx={{ width: 80, height: 80 }}
                                                />
                                                <Stack flex={1}>
                                                    <Typography fontWeight={600}>
                                                        {values.image.name}
                                                    </Typography>
                                                    <Typography fontSize={12} color="text.secondary">
                                                        {(values.image.size / 1024).toFixed(1)} KB
                                                    </Typography>
                                                </Stack>
                                                <IconButton
                                                    onClick={() => setFieldValue("image", null)}
                                                >
                                                    <Close />
                                                </IconButton>
                                            </Stack>
                                        ) : (
                                            <Button
                                                component="label"
                                                variant="outlined"
                                                fullWidth
                                            >
                                                Upload Product Image (Optional)
                                                <input
                                                    type="file"
                                                    hidden
                                                    accept="image/*"
                                                    onChange={(e) =>
                                                        setFieldValue(
                                                            "image",
                                                            e.target.files[0]
                                                        )
                                                    }
                                                />
                                            </Button>
                                        )}
                                    </Box>
                                </Section>

                                {/* ───────── FEATURES ───────── */}
                                <Section
                                    title="Product Features"
                                    subtitle="Highlight key features of the product"
                                >
                                    <FieldArray name="features">
                                        {({ push, remove }) => (
                                            <>
                                                {values.features.map((_, i) => (
                                                    <Stack
                                                        direction="row"
                                                        spacing={1}
                                                        key={i}
                                                    >
                                                        <EcoInput
                                                            name={`features.${i}`}
                                                            label={`Feature ${i + 1}`}
                                                            onChange={handleChange}
                                                        />
                                                        <IconButton onClick={() => remove(i)}>
                                                            <Delete />
                                                        </IconButton>
                                                    </Stack>
                                                ))}

                                                <Button
                                                    startIcon={<Add />}
                                                    onClick={() => push("")}
                                                >
                                                    Add Feature
                                                </Button>
                                            </>
                                        )}
                                    </FieldArray>
                                </Section>

                                {/* ───────── SUMMARY ───────── */}
                                <Section
                                    title="Product Summary"
                                    subtitle="High-level environmental impact summary"
                                >
                                    <EcoInput
                                        name="summary_message1"
                                        label="Summary Message 1"
                                        onChange={handleChange}
                                    />
                                    <EcoInput
                                        name="summary_message2"
                                        label="Summary Message 2 (Optional)"
                                        onChange={handleChange}
                                    />
                                    <EcoInput
                                        name="total_savings_in_percentage"
                                        label="Total Savings (%)"
                                        type="number"
                                        onChange={handleChange}
                                    />
                                </Section>

                                {/* ───────── LIFECYCLE ───────── */}
                                <Section
                                    title="Product Lifecycle"
                                    subtitle="Compare conventional vs eco-friendly lifecycle steps"
                                >
                                    <FieldArray name="lifecycle">
                                        {({ push, remove }) => (
                                            <>
                                                {values.lifecycle.map((_, i) => (
                                                    <Box
                                                        key={i}
                                                        sx={{
                                                            p: 2,
                                                            border: "1px solid #eee",
                                                            borderRadius: "14px"
                                                        }}
                                                    >
                                                        <Stack spacing={1}>
                                                            <Typography fontWeight={700}>
                                                                Step {i + 1}
                                                            </Typography>

                                                            <EcoInput
                                                                name={`lifecycle.${i}.name`}
                                                                label="Step Name"
                                                                onChange={handleChange}
                                                            />
                                                            <EcoInput
                                                                name={`lifecycle.${i}.conventional`}
                                                                label="Conventional"
                                                                type="number"
                                                                onChange={handleChange}
                                                            />
                                                            <EcoInput
                                                                name={`lifecycle.${i}.eco_friendly`}
                                                                label="Eco Friendly"
                                                                type="number"
                                                                onChange={handleChange}
                                                            />
                                                            <EcoInput
                                                                name={`lifecycle.${i}.impact`}
                                                                label="Impact"
                                                                onChange={handleChange}
                                                            />

                                                            <Button
                                                                color="error"
                                                                onClick={() => remove(i)}
                                                            >
                                                                Remove Step
                                                            </Button>
                                                        </Stack>
                                                    </Box>
                                                ))}

                                                <Button
                                                    startIcon={<Add />}
                                                    onClick={() =>
                                                        push({
                                                            name: "",
                                                            conventional: "",
                                                            eco_friendly: "",
                                                            impact: ""
                                                        })
                                                    }
                                                >
                                                    Add Lifecycle Step
                                                </Button>
                                            </>
                                        )}
                                    </FieldArray>
                                </Section>
                            </Stack>
                        </DialogContent>

                        <DialogActions sx={{ px: 3, pb: 2 }}>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button variant="contained" type="submit">
                                Add Product
                            </Button>
                        </DialogActions>
                    </form>
                )}
            </Formik>
        </Dialog>
    );
}
