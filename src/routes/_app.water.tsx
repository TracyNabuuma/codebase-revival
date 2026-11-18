import { createFileRoute } from "@tanstack/react-router";

import { WaterScreen } from "@/features/kukuthrive/WaterScreen";

export const Route = createFileRoute("/_app/water")({
  head: () => ({
    meta: [
      { title: "Water · KukuThrive" },
      { name: "description", content: "Drinker register, refill log and estimated water intake per bird." },
      { property: "og:title", content: "Water · KukuThrive" },
      { property: "og:description", content: "Drinker register, refill log and estimated water intake per bird." },
    ],
  }),
  component: Page,
});

function Page() {
  return <WaterScreen />;
}
