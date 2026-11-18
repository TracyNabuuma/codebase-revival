import { createFileRoute } from "@tanstack/react-router";

import { NotificationsScreen } from "@/features/kukuthrive/NotificationsScreen";

export const Route = createFileRoute("/_app/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications · KukuThrive" },
      { name: "description", content: "Choose how welfare alerts, schedule reminders and data-quality prompts reach you." },
      { property: "og:title", content: "Notifications · KukuThrive" },
      { property: "og:description", content: "Choose how welfare alerts, schedule reminders and data-quality prompts reach you." },
    ],
  }),
  component: Page,
});

function Page() {
  return <NotificationsScreen />;
}
