import { createFileRoute } from "@tanstack/react-router";

import { ResetPasswordPage } from "@/features/auth/ResetPasswordPage";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set a new password · KukuThrive" },
      { name: "description", content: "Choose a new password for your KukuThrive account." },
      { property: "og:title", content: "Set a new password · KukuThrive" },
      { property: "og:description", content: "Choose a new password for your KukuThrive account." },
    ],
  }),
  component: ResetPasswordPage,
});
