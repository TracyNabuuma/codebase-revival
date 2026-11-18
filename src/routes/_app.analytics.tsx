import { createFileRoute } from "@tanstack/react-router";

import { AnalyticsScreen } from "@/features/analytics/AnalyticsScreen";

export const Route = createFileRoute("/_app/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics · KukuThrive" },
      { name: "description", content: "Production and profit trends." },
      { property: "og:title", content: "Analytics · KukuThrive" },
      { property: "og:description", content: "Production and profit trends." },
    ],
  }),
  component: Page,
});

function Page() {
  return <AnalyticsScreen />;
}
