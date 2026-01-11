import { TextField, MenuItem } from "@mui/material";

export default function EcoSelect({ label, options, ...props }) {
    return (
        <TextField select fullWidth label={label} {...props}>
            {options.map(opt => (
                <MenuItem key={opt} value={opt}>
                    {opt}
                </MenuItem>
            ))}
        </TextField>
    );
}
