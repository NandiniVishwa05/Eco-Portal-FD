import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, user } = useSelector(
        (state) => state.auth
    );

    if (!isAuthenticated || !user) {
        return <Navigate to="/" replace />;
    }

    return children;
}
