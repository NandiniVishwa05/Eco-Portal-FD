import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function DashboardRedirect() {
    const { userType, user } = useSelector((state) => state.auth);

    if (userType === "government") {
        return <Navigate to="/dashboard/government/heatmap" replace />;
    }

    if (userType === "individual") {
        return <Navigate to="/dashboard/individual/heatmap" replace />;
    }

    if (userType === "organization") {
        if (user.organization_type === "college") {
            return <Navigate to="/dashboard/college/heatmap" replace />;
        }
        return <Navigate to="/dashboard/organization/heatmap" replace />;
    }


    return <Navigate to="/" replace />;
}
