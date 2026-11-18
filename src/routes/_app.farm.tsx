import { createFileRoute } from "@tanstack/react-router";

import { FarmHousesScreen } from "@/features/kukuthrive/FarmHousesScreen";

export const Route = createFileRoute("/_app/farm")({
  head: () => ({
    meta: [
      { title: "Farm & houses · KukuThrive" },
      { name: "description", content: "Farm identity, poultry-house configuration, usable floor area and stocking density." },
      { property: "og:title", content: "Farm & houses · KukuThrive" },
      { property: "og:description", content: "Farm identity, poultry-house configuration, usable floor area and stocking density." },
    ],
  }),
  component: Page,
});

function Page() {
  return <FarmHousesScreen />;
}
