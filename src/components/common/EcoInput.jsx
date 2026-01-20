import { TextField } from "@mui/material";
import { useField } from "formik";

export default function EcoInput({
    label,
    placeholder,
    type = "text",
    value,
    onChange,
    name,
    ...props
}) {
    let field = {};
    let meta = {};

    try {
        if (name) {
            [field, meta] = useField(name);
        }
    } catch {
        field = {};
        meta = {};
    }

    const isFormik = Boolean(field?.name);
    const showError = isFormik && meta.touched && Boolean(meta.error);

    return (
        <TextField
            {...props}
            fullWidth
            label={label}
            placeholder={placeholder}
            type={type}
            name={name}
            value={isFormik ? field.value : value}
            onChange={(e) => {
                if (isFormik) {
                    field.onChange(e);   // ✅ Formik update
                }
                if (onChange) {
                    onChange(e);         // ✅ Custom logic
                }
            }}
            inputProps={{
                ...(type === "number" && { step: "any" })
            }}
            error={showError}
            helperText={showError ? meta.error : ""}
            InputLabelProps={{
                shrink: true
            }}
            sx={{
                "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "background.paper",

                    "& fieldset": {
                        borderColor: showError
                            ? "error.main"
                            : "rgba(15, 123, 107, 0.25)"
                    },

                    "&:hover fieldset": {
                        borderColor: showError
                            ? "error.main"
                            : "primary.main"
                    },

                    "&.Mui-focused fieldset": {
                        borderColor: showError
                            ? "error.main"
                            : "primary.main",
                        borderWidth: "2px"
                    }
                },

                "& .MuiInputLabel-root": {
                    fontWeight: 600,
                    fontSize: "13px",
                    color: showError ? "error.main" : "text.secondary"
                },

                "& .MuiInputBase-input": {
                    padding: "14px",
                    fontSize: "14px"
                },

                "& .MuiFormHelperText-root": {
                    marginLeft: "4px",
                    fontSize: "12px"
                }
            }}
        />
    );
}
