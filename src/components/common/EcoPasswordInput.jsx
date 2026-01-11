import { useState } from "react";
import {
    TextField,
    IconButton,
    InputAdornment
} from "@mui/material";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

export default function EcoPasswordInput({
    label = "Password",
    placeholder,
    error = false,
    helperText,
    ...props
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <TextField
            fullWidth
            label={label}
            placeholder={placeholder}
            type={showPassword ? "text" : "password"}
            error={error}
            helperText={helperText}
            InputLabelProps={{
                shrink: true
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            edge="end"
                            size="small"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={
                                showPassword ? "Hide password" : "Show password"
                            }
                        >
                            {showPassword ? (
                                <VisibilityOffRoundedIcon fontSize="small" />
                            ) : (
                                <VisibilityRoundedIcon fontSize="small" />
                            )}
                        </IconButton>
                    </InputAdornment>
                )
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
