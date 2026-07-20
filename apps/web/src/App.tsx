import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { SignupPage } from "./pages/SignupPage";
import { SuccessPage } from "./pages/SuccessPage";
import { FailurePage } from "./pages/FailurePage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="register" element={<SignupPage />} />
        <Route path="success" element={<SuccessPage />} />
        <Route path="failure" element={<FailurePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
