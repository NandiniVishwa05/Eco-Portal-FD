import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import img from "../../assets/avani_logo.png";
export default function TopHeader() {
    const theme = useTheme();
    return (
        <Box
            sx={{
                width: "100%",
                py: 2,
                // mb: 1,
                pt: "38px",
            }}
        >
            <Box
                sx={{
                    background: theme.custom.gradients.soft2,
                    maxWidth: 1165,
                    borderRadius: "12px",
                    mx: "auto",
                    px: "10px",
                    py: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                }}
            >
                <Box
                    sx={{
                        width: "100px",
                        height: "70px",
                        borderRadius: "14px",
                        background: "linear-gradient(180deg,#e7fff3,#d1fbec)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "26px",
                        boxShadow: "0 12px 30px rgba(10,60,50,0.06)",
                        flexShrink: 0,
                    }}
                >
                    <img src={img} alt="AVANI-C" />
                </Box>
                <Box 
                sx={{display:"flex-start",
                    flexDirection:"column",
                    alignItems:"center"

                }}>
                    <Typography fontSize={20} sx={{ color: theme.palette.primary.main, lineHeight: 1.2 }} fontWeight={800}>
                        AVANI-C
                    </Typography>
                    <Typography fontSize={13} color="text.secondary">
                        Offline Scanner • Online Maps • Rewards
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
