import { createFileRoute } from "@tanstack/react-router";

import { useAuth } from "@/features/auth/AuthProvider";
import { LoginPage } from "@/features/auth/LoginPage";
import { Navigate } from "@/lib/router-compat";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in · KukuThrive" },
      { name: "description", content: "Sign in to manage your poultry farm with KukuThrive." },
      { property: "og:title", content: "Sign in · KukuThrive" },
      { property: "og:description", content: "Sign in to manage your poultry farm with KukuThrive." },
    ],
  }),
  component: LoginRoute,
});

function LoginRoute() {
  const { user, loading } = useAuth();
  if (!loading && user) return <Navigate to="/" replace />;
  return <LoginPage />;
}
