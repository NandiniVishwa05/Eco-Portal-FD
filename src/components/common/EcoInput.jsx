import { TextField } from "@mui/material";

export default function EcoInput({
    label,
    placeholder,
    error = false,
    helperText,
    type = "text",
    value,
    ...props
}) {
    return (
        <TextField
            fullWidth
            label={label}
            value={value}
            placeholder={placeholder}
            type={type}
            inputProps={{
                ...(type === "number" && { step: "any" })
            }}
            error={error}
            helperText={helperText}
            InputLabelProps={{
                shrink: true
            }}
            sx={{
                "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "background.paper",

                    "& fieldset": {
                        borderColor: error
                            ? "error.main"
                            : "rgba(15, 123, 107, 0.25)"
                    },

                    "&:hover fieldset": {
                        borderColor: error
                            ? "error.main"
                            : "primary.main"
                    },

                    "&.Mui-focused fieldset": {
                        borderColor: error
                            ? "error.main"
                            : "primary.main",
                        borderWidth: "2px"
                    }
                },

                "& .MuiInputLabel-root": {
                    fontWeight: 600,
                    fontSize: "13px",
                    color: error ? "error.main" : "text.secondary"
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
            {...props}
        />
    );
}
