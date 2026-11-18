import { createFileRoute } from "@tanstack/react-router";

import { DailyOperations } from "@/features/kukuthrive/DailyOperations";

export const Route = createFileRoute("/_app/daily/")({
  head: () => ({
    meta: [
      { title: "Daily operations · KukuThrive" },
      { name: "description", content: "A guided daily round: deaths and culls, feed, drinkers and a sensory house check." },
      { property: "og:title", content: "Daily operations · KukuThrive" },
      { property: "og:description", content: "A guided daily round: deaths and culls, feed, drinkers and a sensory house check." },
    ],
  }),
  component: Page,
});

function Page() {
  return <DailyOperations />;
}
