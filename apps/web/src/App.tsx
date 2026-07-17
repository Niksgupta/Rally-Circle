import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminRoute } from "./components/AdminRoute";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { EventsPage } from "./pages/EventsPage";
import { EventDetailPage } from "./pages/EventDetailPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { ProfilePage } from "./pages/ProfilePage";
import { MyEventsPage } from "./pages/MyEventsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AdminEventsPage } from "./pages/admin/AdminEventsPage";
import { AdminEventNewPage } from "./pages/admin/AdminEventNewPage";
import { AdminEventEditPage } from "./pages/admin/AdminEventEditPage";
import { AdminEventRsvpsPage } from "./pages/admin/AdminEventRsvpsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="events/:id" element={<EventDetailPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-events"
          element={
            <ProtectedRoute>
              <MyEventsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin"
          element={
            <AdminRoute>
              <AdminEventsPage />
            </AdminRoute>
          }
        />
        <Route
          path="admin/events/new"
          element={
            <AdminRoute>
              <AdminEventNewPage />
            </AdminRoute>
          }
        />
        <Route
          path="admin/events/:id/edit"
          element={
            <AdminRoute>
              <AdminEventEditPage />
            </AdminRoute>
          }
        />
        <Route
          path="admin/events/:id/rsvps"
          element={
            <AdminRoute>
              <AdminEventRsvpsPage />
            </AdminRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
