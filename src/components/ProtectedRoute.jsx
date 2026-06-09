import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../api/auth";

export const ProtectedRoute = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async() => {
            try {
                await getCurrentUser();
                setAuthenticated(true);
            } catch {
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, [])

    if(loading) {
        return <div>Loading...</div>;
    }

    if(!authenticated) {
        return <Navigate to="/" replace/>
    }

    return <Outlet/>
}

