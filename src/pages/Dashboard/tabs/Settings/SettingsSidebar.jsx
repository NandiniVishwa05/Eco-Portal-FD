import { Stack, Button } from "@mui/material";
import { useState } from "react";

export default function SettingsSidebar({ sections, onSelect }) {
    const [active, setActive] = useState(sections[0].id);

    return (
        <Stack
            spacing={1}
            sx={{
                minWidth: 220,
                position: "sticky",
                top: 1
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
                        justifyContent: "flex-start",
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: 999,
                        px: 2,
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
