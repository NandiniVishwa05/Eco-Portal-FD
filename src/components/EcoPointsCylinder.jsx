import { Box, Typography, Stack } from "@mui/material";

export default function EcoPointsCylinder({
  label = "Ecometer",
  collected = 0,
  available = 4500,
  used = 1800,
}) {
  const total = collected + available + used;

  const getWidth = (value) => `${(value / total) * 100}%`;

  return (
    <Box
      sx={{
        minWidth: 220,
        p: 2,
        // borderRadius: 3,
        // background: "#f9fafb",
        // boxShadow: "inset 0 0 0 1px #e5e7eb",
      }}
    >
      {/* Title */}
      <Typography fontWeight={600} mb={1}>
        {label}
      </Typography>

      {/* Cylinder */}
      <Box
        sx={{
          height: 34,
          display: "flex",
          borderRadius: "999px",
          overflow: "hidden",
          background: "#e5e7eb",
          boxShadow: "inset 0 2px 6px rgba(0,0,0,0.15)",
        }}
      >
        {/* Used */}
        <Box
          sx={{
            width: getWidth(used),
            background: "linear-gradient(180deg,#3b82f6,#1e40af)",
          }}
        />

        {/* Available */}
        <Box
          sx={{
            width: getWidth(available),
            background: "linear-gradient(180deg,#22c55e,#15803d)",
          }}
        />

        {/* Collected */}
        {/* <Box
          sx={{
            width: getWidth(collected),
            background: "linear-gradient(180deg,#fb923c,#c2410c)",
          }}
        /> */}
      </Box>

      {/* Legend */}
      <Stack direction="row" spacing={2} mt={1}>
        <Legend color="#2563eb" label={`Used (${used})`} />
        <Legend color="#16a34a" label={`Available (${available})`} />
        {/* <Legend color="#ea580c" label={`Collected (${collected})`} /> */}
      </Stack>
    </Box>
  );
}

function Legend({ color, label }) {
  return (
    <Stack direction="row" spacing={0.7} alignItems="center">
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: color,
        }}
      />
      <Typography fontSize={12}>{label}</Typography>
    </Stack>
  );
}
