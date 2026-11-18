import { createFileRoute } from "@tanstack/react-router";

import { AlertsScreen } from "@/features/alerts/AlertsScreen";

export const Route = createFileRoute("/_app/alerts")({
  head: () => ({
    meta: [
      { title: "Alerts · KukuThrive" },
      { name: "description", content: "Warnings about mortality, stock and payments." },
      { property: "og:title", content: "Alerts · KukuThrive" },
      { property: "og:description", content: "Warnings about mortality, stock and payments." },
    ],
  }),
  component: Page,
});

function Page() {
  return <AlertsScreen />;
}
