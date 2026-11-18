import { useEffect, type ReactNode } from "react";
import { create } from "zustand";

import { supabase } from "@/integrations/supabase/client";

export interface User {
  id: string;
  email: string;
  name: string;
  /** null = signed in but the Owner has not granted a role yet. */
  role: "owner" | "manager" | null;
  farmName?: string;
  createdAt?: string;
}

/** Shape the older screens read through `@/lib/store`. */
export interface LegacyUser {
  name: string;
  email: string;
  role: "Owner" | "Manager";
}

interface AuthState {
  user: User | null;
  legacyUser: LegacyUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  sendReset: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  restore: () => Promise<void>;
}

function toLegacy(user: User | null): LegacyUser | null {
  if (!user || !user.role) return null;
  return { name: user.name, email: user.email, role: user.role === "owner" ? "Owner" : "Manager" };
}

/** Loads profile + role for the signed-in account. Roles come only from the protected roles table. */
async function loadUser(): Promise<User | null> {
  const { data: auth } = await supabase.auth.getUser();
  const authUser = auth.user;
  if (!authUser) return null;
  const [{ data: profile }, { data: roles }] = await Promise.all([
    supabase.from("profiles").select("name, email, created_at").eq("id", authUser.id).maybeSingle(),
    supabase.from("user_roles").select("role").eq("user_id", authUser.id),
  ]);
  const names = (roles ?? []).map((r) => r.role);
  const role = names.includes("owner") ? "owner" : names.includes("manager") ? "manager" : null;
  return {
    id: authUser.id,
    email: profile?.email ?? authUser.email ?? "",
    name: profile?.name || authUser.email?.split("@")[0] || "",
    role,
    createdAt: profile?.created_at,
  };
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  legacyUser: null,
  loading: true,

  login: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message === "Invalid login credentials" ? "Email or password is incorrect." : error.message);
    const user = await loadUser();
    set({ user, legacyUser: toLegacy(user), loading: false });
  },

  signUp: async (email, password, name) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin, data: { name } },
    });
    if (error) throw new Error(error.message);
  },

  sendReset: async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw new Error(error.message);
  },

  logout: async () => {
    await supabase.auth.signOut().catch(() => undefined);
    set({ user: null, legacyUser: null, loading: false });
  },

  restore: async () => {
    try {
      const user = await loadUser();
      set({ user, legacyUser: toLegacy(user), loading: false });
    } catch {
      set({ user: null, legacyUser: null, loading: false });
    }
  },
}));

export function AuthProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") useAuthStore.setState({ user: null, legacyUser: null, loading: false });
      else if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        setTimeout(() => void useAuthStore.getState().restore(), 0);
      }
    });
    void useAuthStore.getState().restore();
    return () => data.subscription.unsubscribe();
  }, []);
  return <>{children}</>;
}

export function useAuth() {
  return useAuthStore();
}
