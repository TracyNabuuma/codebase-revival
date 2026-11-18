import { createFileRoute } from "@tanstack/react-router";

import { GrowthScreen } from "@/features/kukuthrive/GrowthScreen";

export const Route = createFileRoute("/_app/growth")({
  head: () => ({
    meta: [
      { title: "Growth & weighing · KukuThrive" },
      { name: "description", content: "Sample weights, daily gain, uniformity and expected development for each flock." },
      { property: "og:title", content: "Growth & weighing · KukuThrive" },
      { property: "og:description", content: "Sample weights, daily gain, uniformity and expected development for each flock." },
    ],
  }),
  component: Page,
});

function Page() {
  return <GrowthScreen />;
}
