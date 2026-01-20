import { TextField, MenuItem } from "@mui/material";
import { useField } from "formik";

export default function EcoSelect({
  label,
  options = [],
  name,
  value,
  onChange,
  ...props
}) {
  let field, meta;

  try {
    [field, meta] = name ? useField(name) : [];
  } catch {
    field = {};
    meta = {};
  }

  const isFormik = Boolean(field?.name);

  return (
    <TextField
      {...props}
      select
      fullWidth
      label={label}
      name={name}
      value={isFormik ? field.value : value}
      onChange={(e) => {
        if (isFormik) {
          field.onChange(e);
        }
        if (onChange) {
          onChange(e);
        }
      }}
      error={isFormik && meta.touched && Boolean(meta.error)}
      helperText={isFormik && meta.touched ? meta.error : ""}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px"
        }
      }}
    >
      {options.map((opt, index) =>
        typeof opt === "object" ? (
          <MenuItem key={opt.value ?? index} value={opt.value}>
            {opt.label}
          </MenuItem>
        ) : (
          <MenuItem key={opt} value={opt}>
            {String(opt)}
          </MenuItem>
        )
      )}
    </TextField>
  );
}
