import { Navigate, useLocation } from "react-router";
import Loader from "./Loader";
import { useAuth } from "../context/AuthProvider";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { currentUser, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader loading={loading} />
            </div>
        );
    }

    if (!currentUser) {
        return (
            <Navigate
                to={"/login"}
                state={{ from: location.pathname }}
                replace
            />
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
