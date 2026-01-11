import { NavLink } from "react-router-dom";
import { Stack, Button } from "@mui/material";

export default function TabsRenderer({ role, tabs }) {
    return (
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            {tabs.map((tab) => (
                <Button
                    key={tab}
                    component={NavLink}
                    to={`/dashboard/${role}/${tab}`}
                    variant="text"
                >
                    {tab.toUpperCase()}
                </Button>
            ))}
        </Stack>
    );
}
