import { createFileRoute } from "@tanstack/react-router";

import { StandardsScreen } from "@/features/kukuthrive/StandardsScreen";

export const Route = createFileRoute("/_app/standards")({
  head: () => ({
    meta: [
      { title: "Standards & thresholds · KukuThrive" },
      { name: "description", content: "Reference values and scored-parameter trigger levels, with source and review status." },
      { property: "og:title", content: "Standards & thresholds · KukuThrive" },
      { property: "og:description", content: "Reference values and scored-parameter trigger levels, with source and review status." },
    ],
  }),
  component: Page,
});

function Page() {
  return <StandardsScreen />;
}
