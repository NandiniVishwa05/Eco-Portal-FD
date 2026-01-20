import { Typography } from "@mui/material";
import CertificatesTable from "./CertificatesTable";
import { certificatesColumns } from "./certificatesColumns";
import { mapAvailableCertificates } from "./certificatesMapper";

export default function CertificatesRoleSection({ role, certificates, loading }) {
    const rows = mapAvailableCertificates(certificates);

    return (
        <>
            <Typography fontSize={18} fontWeight={700} sx={{ mb: 1 }}>
                {role === "seller" ? "OTHER" : role.toUpperCase()}
            </Typography>

            <CertificatesTable
                columns={certificatesColumns.government}
                rows={rows}
                rowsPerPage={5}
                loading={loading}
                emptyMessage="No certificates available."
            />
        </>
    );
}
