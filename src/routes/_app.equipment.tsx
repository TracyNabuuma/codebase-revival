import { createFileRoute } from "@tanstack/react-router";

import { EquipmentList } from "@/features/equipment/EquipmentList";

export const Route = createFileRoute("/_app/equipment")({
  head: () => ({
    meta: [
      { title: "Equipment · KukuThrive" },
      { name: "description", content: "Farm equipment and maintenance." },
      { property: "og:title", content: "Equipment · KukuThrive" },
      { property: "og:description", content: "Farm equipment and maintenance." },
    ],
  }),
  component: Page,
});

function Page() {
  return <EquipmentList />;
}
