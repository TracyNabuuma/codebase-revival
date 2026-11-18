import { createFileRoute } from "@tanstack/react-router";

import { MedicationList } from "@/features/health/MedicationList";

export const Route = createFileRoute("/_app/medication")({
  head: () => ({
    meta: [
      { title: "Medication · KukuThrive" },
      { name: "description", content: "Medicine stock and treatments." },
      { property: "og:title", content: "Medication · KukuThrive" },
      { property: "og:description", content: "Medicine stock and treatments." },
    ],
  }),
  component: Page,
});

function Page() {
  return <MedicationList />;
}
