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
import { useRef } from "react";
import { Add, Delete, Close } from "@mui/icons-material";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";

import EcoInput from "../../../../components/common/EcoInput";
import EcoSelect from "../../../../components/common/EcoSelect";
import { createProduct, getProductCategories, getProductTypes } from "../../../../services/productService";
import { useState } from "react";
import FullScreenLoader from "../../../../components/common/FullScreenLoader";
import { useEffect } from "react";
import { calculateImpactFromLifecycle } from "../../../../utils/environmentCalculator";

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

const PRODUCT_CATEGORIES = [
    { label: "Plastic Bottle", value: "bottle" },
    { label: "Cloth Bag", value: "bag" },
    { label: "Steel Bottle", value: "steel" },
    { label: "Other Product", value: "other" }
];

const PRODUCT_TYPES = {
    bottle: [
        "Virgin PET (Single-use)",
        "30% Recycled PET",
        "100% Recycled PET",
        "HDPE Reusable Plastic"
    ],
    bag: [
        "Cotton Cloth Bag",
        "Polyester Fabric Bag"
    ],
    steel: [
        "Steel Bottle – Single Wall",
        "Steel Bottle – Insulated"
    ]
};

const initialValues = {
    name: "",
    impact_category: "",
    price: "",
    // ecopoints: "",
    // co2_savings: "",
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
    ],
    product_category: "",     // bottle | bag | steel | other
    product_type: "",         // only for predefined ones

    calculated_ecopoints: null,
    calculated_co2: null,

    custom_lifecycle: {
        is_reusable: "no",          // "yes" | "no"
        washing_co2: "",
        expected_uses: "",
        raw_material_weight: "",
        manufacturing_co2: "",
        transport_co2: "",
        end_of_life_co2: "",
        emission_factor: ""
    }
};

const schema = Yup.object({
    name: Yup.string().required("Product name is required"),
    impact_category: Yup.string().required("Impact category is required"),
    price: Yup.number().required("Price is required"),

    // ❌ REMOVED FROM UI – calculated automatically
    // ecopoints: Yup.number().required(),
    // co2_savings: Yup.number().required(),

    plastic_averted: Yup.number().nullable(),

    summary_message1: Yup.string().required("Summary message is required"),
    total_savings_in_percentage: Yup.number().required(
        "Total savings percentage is required"
    ),

    // ───────── CONDITIONAL VALIDATION ─────────
    product_category: Yup.string().required("Product category is required"),

    product_type: Yup.string().when("product_category", {
        is: (val) => ["bottle", "bag", "steel"].includes(val),
        then: (schema) => schema.required("Product type is required"),
        otherwise: (schema) => schema.notRequired()
    }),

    custom_lifecycle: Yup.object().when("product_category", {
        is: "other",
        then: () =>
            Yup.object({
                is_reusable: Yup.string().oneOf(["yes", "no"]).required(),

                washing_co2: Yup.number().when("is_reusable", {
                    is: "yes",
                    then: (schema) => schema.required("Washing CO₂ is required"),
                    otherwise: (schema) => schema.notRequired()
                }),

                expected_uses: Yup.number().when("is_reusable", {
                    is: "yes",
                    then: (schema) =>
                        schema
                            .required("Expected uses required")
                            .min(1, "Must be at least 1"),
                    otherwise: (schema) => schema.notRequired()
                }),

                raw_material_weight: Yup.number().required(),
                manufacturing_co2: Yup.number().required(),
                transport_co2: Yup.number().required(),
                end_of_life_co2: Yup.number().required(),
                emission_factor: Yup.number().required()
            }),
        otherwise: () => Yup.object().notRequired()
    })
});

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

export default function CreateProductModal({ open, onClose, onSuccess, onError }) {
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");
    const [productCategories, setProductCategories] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [selectedProductCategory, setSelectedProductCategory] = useState("");
    const [selectedLifecycle, setSelectedLifecycle] = useState(null);
    const formikRef = useRef(null);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setLoading(true);
            setLoadingMessage("Creating product...");
            const formData = new FormData();

            // ───── BASIC FIELDS ─────
            formData.append("name", values.name);
            formData.append("impact_category", values.impact_category);
            formData.append("price", values.price);

            // ❌ NO LONGER SENT – calculated on backend
            // formData.append("ecopoints", values.ecopoints);
            // formData.append("co2_savings", values.co2_savings);
            formData.append(
                "calculated_co2",
                values.calculated_co2 ?? 0
            );

            formData.append(
                "calculated_ecopoints",
                values.calculated_ecopoints ?? 0
            );
            formData.append("plastic_averted", values.plastic_averted || 0);
            formData.append("product_category", values.product_category);

            // ───── PREDEFINED PRODUCT TYPE ─────
            if (["bottle", "bag", "steel"].includes(values.product_category)) {
                formData.append("product_type", values.product_type);
            }

            // ───── CUSTOM PRODUCT LIFECYCLE ─────
            if (values.product_category === "other") {
                formData.append(
                    "custom_lifecycle",
                    JSON.stringify(values.custom_lifecycle)
                );
            }

            // ───── IMAGE ─────
            if (values.image) {
                formData.append("image", values.image);
            }

            // ───── FEATURES ─────
            formData.append(
                "features",
                JSON.stringify(values.features.filter(Boolean))
            );

            // ───── SUMMARY ─────
            formData.append(
                "summary",
                JSON.stringify({
                    summary_message1: values.summary_message1,
                    summary_message2: values.summary_message2,
                    total_savings_in_percentage:
                        values.total_savings_in_percentage
                })
            );

            // ❌ OLD LIFECYCLE ARRAY (UI-based explanation only)
            // formData.append("lifecycle", JSON.stringify(values.lifecycle));

            await createProduct(formData);
            onSuccess("Product created successfully");
            onClose();
        } catch (err) {
            onError(err);
            console.error("Create product failed", err);
        } finally {
            setLoading(false);
            setLoadingMessage("");
            setSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchProductCategories = async () => {
            try {
                const response = await getProductCategories();
                console.log(response);

                setProductCategories(response?.data?.data || []);
            } catch (error) {
                console.error("Failed to fetch product lifecycle templates", error);
            }
        };
        fetchProductCategories();
    }, [])

    useEffect(() => {
        console.log("control coming");
        if (!selectedProductCategory || selectedProductCategory === "other") {
            setProductTypes([]);
            return;
        }

        const fetchProductTypes = async () => {
            try {

                const response = await getProductTypes(selectedProductCategory);
                setProductTypes(response?.data?.data || []);
            } catch (error) {
                console.error("Failed to fetch product types", error);
            }
        };

        fetchProductTypes();
    }, [selectedProductCategory]);

    const recalculateImpact = (values, setFieldValue) => {
        try {

            let lifecycle = null;
            // console.log("control incoming");

            // PREDEFINED PRODUCT
            if (
                values.product_type &&
                ["bottle", "bag", "steel"].includes(values.product_category)
            ) {
                const template = productTypes.find(
                    (t) => t.product_type_code === values.product_type
                );

                if (!template) return;

                lifecycle = {
                    raw_material_weight: template.lifecycle.raw_material_weight_kg,
                    manufacturing_co2: template.lifecycle.manufacturing_co2_kg,
                    transport_co2: template.lifecycle.transport_co2_kg,
                    end_of_life_co2: template.lifecycle.end_of_life_co2_kg,
                    emission_factor: template.lifecycle.emission_factor
                };
            }

            // CUSTOM PRODUCT
            if (values.product_category === "other") {
                const l = values.custom_lifecycle;

                if (
                    !l.raw_material_weight ||
                    !l.manufacturing_co2 ||
                    !l.transport_co2 ||
                    !l.end_of_life_co2 ||
                    !l.emission_factor
                ) {
                    return;
                }

                lifecycle = l;
            }

            if (!lifecycle) return;

            const { co2, ecopoints } =
                calculateImpactFromLifecycle(lifecycle);

            setFieldValue("calculated_co2", co2);
            setFieldValue("calculated_ecopoints", ecopoints);
        } catch (error) {
            console.log(error);
            console.log(error.message);

        }
    };

    const categoryOptions = productCategories.map((cat) => ({
        label: cat.label,
        value: cat.key
    }));

    // Convert backend product types → EcoSelect format
    const productTypeOptions = productTypes.map((type) => ({
        label: type.product_type_label,
        value: type.product_type_code
    }));

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
                <FullScreenLoader open={loading} message={loadingMessage} />
                <DialogTitle fontWeight={800}>
                    Create Product
                </DialogTitle>

                <Formik
                    innerRef={formikRef}
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
                                        <Stack direction="row" spacing={2}>
                                            <EcoInput
                                                name="name"
                                                label="Product Name"
                                                onChange={handleChange}
                                            />
                                            <EcoInput
                                                name="price"
                                                label="Price"
                                                type="number"
                                                onChange={handleChange}
                                            />
                                        </Stack>
                                        <EcoSelect
                                            name="impact_category"
                                            label="Impact Category"
                                            options={IMPACT_OPTIONS}
                                            value={values.impact_category}
                                            onChange={handleChange}
                                        />

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
                                                    Upload Product Image
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

                                        <EcoSelect
                                            name="product_category"
                                            label="Product Category"
                                            options={categoryOptions}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                console.log("value", value);

                                                setSelectedProductCategory(value);
                                                // Formik
                                                setFieldValue("product_category", value);
                                                setFieldValue("product_type", "");

                                                // Local state → triggers API
                                            }}
                                        />

                                        {productTypes?.length > 0 && values.product_category !== "other" && (
                                            <EcoSelect
                                                name="product_type"
                                                label="Product Type"
                                                options={productTypeOptions}
                                                onChange={(e) => {
                                                    handleChange(e);

                                                    const value = e.target.value;
                                                    setFieldValue("product_type", value);

                                                    recalculateImpact(
                                                        { ...values, product_type: value },
                                                        setFieldValue
                                                    );
                                                }}
                                            />
                                        )}

                                        {values.product_category === "other" && (
                                            <Section
                                                title="Lifecycle Inputs (Required)"
                                                subtitle="Used to calculate CO₂ emissions and EcoPoints"
                                            >
                                                <EcoSelect
                                                    name="custom_lifecycle.is_reusable"
                                                    label="Is this product reusable?"
                                                    options={[
                                                        { label: "Yes", value: "yes" },
                                                        { label: "No", value: "no" }
                                                    ]}
                                                    onChange={(e) => {
                                                        handleChange(e);

                                                        if (e.target.value === "no") {
                                                            setFieldValue("custom_lifecycle.washing_co2", "");
                                                        }

                                                        recalculateImpact(
                                                            {
                                                                ...values,
                                                                custom_lifecycle: {
                                                                    ...values.custom_lifecycle,
                                                                    is_reusable: e.target.value
                                                                }
                                                            },
                                                            setFieldValue
                                                        );
                                                    }}
                                                />

                                                {values.custom_lifecycle.is_reusable === "yes" && (
                                                    <EcoInput
                                                        name="custom_lifecycle.expected_uses"
                                                        label="Expected Number of Uses"
                                                        type="number"
                                                        onChange={(e) => {
                                                            handleChange(e);

                                                            recalculateImpact(
                                                                {
                                                                    ...values,
                                                                    custom_lifecycle: {
                                                                        ...values.custom_lifecycle,
                                                                        expected_uses: e.target.value
                                                                    }
                                                                },
                                                                setFieldValue
                                                            );
                                                        }}
                                                    />
                                                )}


                                                < EcoInput
                                                    name="custom_lifecycle.raw_material_weight"
                                                    label="Raw Material Weight (kg)"
                                                    type="number"
                                                    onChange={(e) => {
                                                        handleChange(e);

                                                        recalculateImpact(
                                                            {
                                                                ...values,
                                                                custom_lifecycle: {
                                                                    ...values.custom_lifecycle,
                                                                    raw_material_weight: e.target.value
                                                                }
                                                            },
                                                            setFieldValue
                                                        );
                                                    }}
                                                />
                                                <EcoInput
                                                    name="custom_lifecycle.manufacturing_co2"
                                                    label="Manufacturing CO₂ (kg)"
                                                    type="number"
                                                    onChange={(e) => {
                                                        handleChange(e);

                                                        recalculateImpact(
                                                            {
                                                                ...values,
                                                                custom_lifecycle: {
                                                                    ...values.custom_lifecycle,
                                                                    manufacturing_co2: e.target.value
                                                                }
                                                            },
                                                            setFieldValue
                                                        );
                                                    }}
                                                />
                                                <EcoInput
                                                    name="custom_lifecycle.transport_co2"
                                                    label="Transport CO₂ (kg)"
                                                    type="number"
                                                    onChange={(e) => {
                                                        handleChange(e);

                                                        recalculateImpact(
                                                            {
                                                                ...values,
                                                                custom_lifecycle: {
                                                                    ...values.custom_lifecycle,
                                                                    transport_co2: e.target.value
                                                                }
                                                            },
                                                            setFieldValue
                                                        );
                                                    }}
                                                />
                                                {values.custom_lifecycle.is_reusable === "yes" && (
                                                    <EcoInput
                                                        name="custom_lifecycle.washing_co2"
                                                        label="Washing CO₂ per use (kg)"
                                                        type="number"
                                                        onChange={(e) => {
                                                            handleChange(e);

                                                            recalculateImpact(
                                                                {
                                                                    ...values,
                                                                    custom_lifecycle: {
                                                                        ...values.custom_lifecycle,
                                                                        washing_co2: e.target.value
                                                                    }
                                                                },
                                                                setFieldValue
                                                            );
                                                        }}
                                                    />
                                                )}
                                                <EcoInput
                                                    name="custom_lifecycle.end_of_life_co2"
                                                    label="End-of-Life CO₂ (kg)"
                                                    type="number"
                                                    onChange={(e) => {
                                                        handleChange(e);

                                                        recalculateImpact(
                                                            {
                                                                ...values,
                                                                custom_lifecycle: {
                                                                    ...values.custom_lifecycle,
                                                                    end_of_life_co2: e.target.value
                                                                }
                                                            },
                                                            setFieldValue
                                                        );
                                                    }}
                                                />
                                                <EcoInput
                                                    name="custom_lifecycle.emission_factor"
                                                    label="Emission Factor"
                                                    type="number"
                                                    onChange={(e) => {
                                                        handleChange(e);

                                                        recalculateImpact(
                                                            {
                                                                ...values,
                                                                custom_lifecycle: {
                                                                    ...values.custom_lifecycle,
                                                                    emission_factor: e.target.value
                                                                }
                                                            },
                                                            setFieldValue
                                                        );
                                                    }}
                                                />
                                            </Section>
                                        )}

                                        {/* <Stack direction="row" spacing={2}>
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
                                    </Stack> */}

                                        {/* <Stack direction="row" spacing={2}>
                                        <EcoInput
                                            name="co2_savings"
                                            label="CO₂ Emission (kg)"
                                            type="number"
                                            onChange={handleChange}
                                        />
                                        <EcoInput
                                            name="plastic_averted"
                                            label="Plastic Averted (kg)"
                                            type="number"
                                            onChange={handleChange}
                                        />
                                    </Stack> */}
                                    </Section>

                                    {values.calculated_co2 !== null && (
                                        <Section
                                            title="Calculated Environmental Impact"
                                            subtitle="Automatically calculated based on lifecycle data"
                                        >
                                            <Stack direction="row" spacing={2}>
                                                <EcoInput
                                                    name="calculated_co2"
                                                    label="CO₂ Emission (kg)"
                                                    disabled
                                                />

                                                <EcoInput
                                                    name="calculated_ecopoints"
                                                    label="EcoPoints"
                                                    disabled
                                                />
                                            </Stack>
                                        </Section>
                                    )}

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
                                    {/* <Section
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
                                </Section> */}
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
        </>
    );
}
