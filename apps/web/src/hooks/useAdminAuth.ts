import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export function useAdminAuth() {
 const [session, setSession] = useState<Session | null>(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 let mounted = true;

 async function loadSession() {
 const {
 data: { session },
 } = await supabase.auth.getSession();

 if (mounted) {
 setSession(session);
 setLoading(false);
 }
 }

 loadSession();

 const {
 data: { subscription },
 } = supabase.auth.onAuthStateChange((_event, session) => {
 setSession(session);
 setLoading(false);
 });

 return () => {
 mounted = false;
 subscription.unsubscribe();
 };
 }, []);

 const signOut = async () => {
 await supabase.auth.signOut();
 };

 return {
 session,
 loading,
 user: session?.user ?? null,
 signOut,
 isAuthenticated: !!session,
 };
}