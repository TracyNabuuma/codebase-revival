import { createFileRoute } from "@tanstack/react-router";

import { SettingsScreen } from "@/features/settings/SettingsScreen";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({
    meta: [
      { title: "Settings · KukuThrive" },
      { name: "description", content: "Farm and account settings." },
      { property: "og:title", content: "Settings · KukuThrive" },
      { property: "og:description", content: "Farm and account settings." },
    ],
  }),
  component: Page,
});

function Page() {
  return <SettingsScreen />;
}
