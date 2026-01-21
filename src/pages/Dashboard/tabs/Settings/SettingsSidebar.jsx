import { Stack, Button } from "@mui/material";
import { useState } from "react";

export default function SettingsSidebar({ sections, onSelect, isMobile }) {
    const [active, setActive] = useState(sections[0].id);

    return (
        <Stack
            direction={isMobile ? "row" : "column"}
            spacing={1}
            sx={{
                minWidth: isMobile ? "100%" : 220,
                overflowX: isMobile ? "auto" : "visible",
                flexShrink: 0,
                "&::-webkit-scrollbar": { display: "none" }
            }}
        >
            {sections.map((s) => (
                <Button
                    key={s.id}
                    onClick={() => {
                        setActive(s.id);
                        onSelect(s.id);
                    }}
                    sx={{
                        flexShrink: 0,
                        justifyContent: "flex-start",
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: 999,
                        px: 2,
                        whiteSpace: "nowrap",
                        color: active === s.id ? "primary.main" : "text.secondary",
                        background:
                            active === s.id
                                ? (theme) => theme.custom.gradients.soft2
                                : "transparent"
                    }}
                >
                    {s.label}
                </Button>
            ))}
        </Stack>
    );
}
