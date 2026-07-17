import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ConfigBanner } from "./ConfigBanner";
import { useAuth } from "../context/AuthContext";

export function Layout() {
  const { configured } = useAuth();
  return (
    <div className="flex min-h-full flex-col">
      {!configured && <ConfigBanner />}
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
