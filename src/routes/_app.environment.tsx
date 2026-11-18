import { createFileRoute } from "@tanstack/react-router";

import { EnvironmentScreen } from "@/features/kukuthrive/EnvironmentScreen";

export const Route = createFileRoute("/_app/environment")({
  head: () => ({
    meta: [
      { title: "Environment · KukuThrive" },
      { name: "description", content: "Scored heat, air, ammonia, draught and dust checks at bird height, plus optional readings." },
      { property: "og:title", content: "Environment · KukuThrive" },
      { property: "og:description", content: "Scored heat, air, ammonia, draught and dust checks at bird height, plus optional readings." },
    ],
  }),
  component: Page,
});

function Page() {
  return <EnvironmentScreen />;
}
