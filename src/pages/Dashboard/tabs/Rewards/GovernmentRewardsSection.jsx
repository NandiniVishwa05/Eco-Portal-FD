import { Typography } from "@mui/material";
import RewardsTable from "./RewardsTable";
import { rewardsColumns } from "./rewardsColumns";
import { mapAvailableRewards } from "./rewardsMapper";

const VISIBILITY_MAP = {
    individual: "is_visible_to_individual",
    college: "is_visible_to_college",
    manufacturer: "is_visible_to_manufacturer",
    retailer: "is_visible_to_retailer",
    seller: "is_visible_to_seller",
    institution: "is_visible_to_institution"
};

export default function GovernmentRewardsSection({
    loading,
    title,
    role,
    rewards
}) {
    const filtered = rewards.filter(
        r => r[VISIBILITY_MAP[role]] === true
    );

    const rows = mapAvailableRewards(filtered);

    return (
        <>
            <Typography fontSize={18} fontWeight={700} sx={{ mb: 1 }}>
                {title}
            </Typography>

            <RewardsTable
                columns={rewardsColumns.platform}
                rows={rows}
                loading={loading}
                emptyMessage={`No rewards available for ${title}`}
                rowsPerPage={5}
            />
        </>
    );
}
