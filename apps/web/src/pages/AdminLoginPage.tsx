import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAdminAuth } from "../hooks/useAdminAuth";

export function AdminLoginPage() {
 const navigate = useNavigate();
 const { isAuthenticated } = useAdminAuth();

 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [loading, setLoading] = useState(false);

 useEffect(() => {
 if (isAuthenticated) {
 navigate("/admin/dashboard", { replace: true });
 }
 }, [isAuthenticated, navigate]);

 const handleLogin = async (e: React.FormEvent) => {
 e.preventDefault();

 setLoading(true);

 const { error } = await supabase.auth.signInWithPassword({
 email,
 password,
 });

 setLoading(false);

 if (error) {
 alert(error.message);
 return;
 }

 navigate("/admin/dashboard", { replace: true });
 };

 return (
 <div className="min-h-screen bg-[hashtag#f8f4ef] flex items-center justify-center px-4">
 <div className="w-full max-w-md rounded-3xl bg-white shadow-xl p-8">

 <h1 className="text-3xl font-bold text-center text-[hashtag#3d2b1f]">
 Rally Circle
 </h1>

 <p className="text-center text-gray-500 mt-2">
 Admin Dashboard Login
 </p>

 <form onSubmit={handleLogin} className="mt-8 space-y-5">

 <div>
 <label className="block text-sm font-medium mb-2">
 Email
 </label>

 <input
 type="email"
 required
 value={email}
 onChange= {(e) => setEmail(e.target.value)}
 placeholder="admin@gmail.com"
 className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[hashtag#8a5c3d]"
 />
 </div>

 <div>
 <label className="block text-sm font-medium mb-2">
 Password
 </label>

 <input
 type="password"
 required
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 placeholder="********"
 className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[hashtag#8a5c3d]"
 />
 </div>

 <button
 type="submit"
 disabled={loading}
 className="btn-primary btn-animated w-full"
 >
 {loading ? "Signing in..." : "Login"}
 </button>

 </form>
 </div>
 </div>
 );
}

