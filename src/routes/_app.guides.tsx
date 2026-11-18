import { createFileRoute } from "@tanstack/react-router";

import { GuidesScreen } from "@/features/kukuthrive/GuidesScreen";

export const Route = createFileRoute("/_app/guides")({
  head: () => ({
    meta: [
      { title: "Field guides · KukuThrive" },
      { name: "description", content: "Short, plain-language guides for scoring, weighing and inspections, usable offline." },
      { property: "og:title", content: "Field guides · KukuThrive" },
      { property: "og:description", content: "Short, plain-language guides for scoring, weighing and inspections, usable offline." },
    ],
  }),
  component: Page,
});

function Page() {
  return <GuidesScreen />;
}
