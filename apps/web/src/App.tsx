import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { SignupPage } from "./pages/SignupPage";
import { SuccessPage } from "./pages/SuccessPage";
import { FailurePage } from "./pages/FailurePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

export default function App() {
  return (
    <>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="register" element={<SignupPage />} />
        <Route path="success" element={<SuccessPage />} />
        <Route path="failure" element={<FailurePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="admin" element={<AdminLoginPage />} />
        <Route path="admin/dashboard" element={ <ProtectedRoute> <AdminDashboard /></ProtectedRoute>} />
      </Route>
    </Routes>
    <FloatingWhatsApp/>
    </>
  );
}
