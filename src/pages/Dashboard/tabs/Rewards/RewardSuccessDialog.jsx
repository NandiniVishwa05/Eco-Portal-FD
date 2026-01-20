import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function RewardSuccessDialog({
    open,
    onClose,
    rewardName,
    points
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    borderRadius: "16px",
                    p: 2,
                    minWidth: "340px"
                }
            }}
        >
            <DialogTitle sx={{ textAlign: "center", pt: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                    <CheckCircleIcon
                        sx={{
                            fontSize: 64,
                            color: "success.main"
                        }}
                    />
                </Box>

                <Typography fontSize={22} fontWeight={700}>
                    Reward Redeemed!
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ textAlign: "center", pb: 2 }}>
                <Typography fontSize={16} color="text.secondary" mb={1}>
                    You have successfully redeemed
                </Typography>

                <Typography fontSize={18} fontWeight={600}>
                    {rewardName}
                </Typography>

                {points && (
                    <Typography
                        fontSize={28}
                        fontWeight={700}
                        color="primary.main"
                        mt={1}
                    >
                        {points} EcoPoints
                    </Typography>
                )}
            </DialogContent>

            <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
                <Button
                    onClick={onClose}
                    variant="contained"
                    sx={{
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: 600,
                        px: 4,
                        py: 1.5
                    }}
                >
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    );
}
