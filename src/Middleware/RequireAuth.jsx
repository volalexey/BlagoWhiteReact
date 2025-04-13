import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const RequireAuth = ({ children }) => {
    const { isUserLoggedIn } = useContext(UserContext);
    const location = useLocation();

    if (!isUserLoggedIn()) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export { RequireAuth };