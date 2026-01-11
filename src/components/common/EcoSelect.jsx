import { TextField, MenuItem } from "@mui/material";

export default function EcoSelect({ label, options = [], ...props }) {
  return (
    <TextField select fullWidth label={label} {...props}>
      {options.map((opt, index) => {
        // If option is an object
        if (typeof opt === "object" && opt !== null) {
          return (
            <MenuItem key={opt.value ?? index} value={opt.value}>
              {opt.label}
            </MenuItem>
          );
        }

        // If option is string/number
        return (
          <MenuItem key={opt} value={opt}>
            {String(opt)}
          </MenuItem>
        );
      })}
    </TextField>
  );
}
