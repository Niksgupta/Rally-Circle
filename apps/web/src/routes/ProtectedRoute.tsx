import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../hooks/useAdminAuth";

interface ProtectedRouteProps {
 children: React.ReactNode;
}

export default function ProtectedRoute({
 children,
}: ProtectedRouteProps) {
 const { loading, isAuthenticated } = useAdminAuth();

 if (loading) {
 return (
 <div className="min-h-screen flex items-center justify-center">
 <h2 className="text-lg font-semibold">Loading...</h2>
 </div>
 );
 }

 if (!isAuthenticated) {
 return <Navigate to="/admin" replace />;
 }

 return <>{children}</>;
}

