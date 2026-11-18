import { createFileRoute } from "@tanstack/react-router";

import { Dashboard } from "@/features/dashboard/Dashboard";
import { AppLayout } from "@/components/app/AppLayout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Farm overview \u00b7 KukuThrive" },
      { name: "description", content: "Today's eggs, birds, money and alerts across your poultry farm." },
      { property: "og:title", content: "Farm overview \u00b7 KukuThrive" },
      { property: "og:description", content: "Today's eggs, birds, money and alerts across your poultry farm." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppLayout>
      <Dashboard />
    </AppLayout>
  );
}
