import { createFileRoute } from "@tanstack/react-router";

import { WelfareScreen } from "@/features/kukuthrive/WelfareScreen";

export const Route = createFileRoute("/_app/welfare")({
  head: () => ({
    meta: [
      { title: "Welfare intelligence · KukuThrive" },
      { name: "description", content: "Five welfare dimensions with evidence quality, investigation prompts and intervention outcomes." },
      { property: "og:title", content: "Welfare intelligence · KukuThrive" },
      { property: "og:description", content: "Five welfare dimensions with evidence quality, investigation prompts and intervention outcomes." },
    ],
  }),
  component: Page,
});

function Page() {
  return <WelfareScreen />;
}
