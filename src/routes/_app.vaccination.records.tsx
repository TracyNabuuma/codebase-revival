import { createFileRoute } from "@tanstack/react-router";

import { VaccinationList } from "@/features/health/VaccinationList";

export const Route = createFileRoute("/_app/vaccination/records")({
  head: () => ({
    meta: [
      { title: "Vaccination records · KukuThrive" },
      { name: "description", content: "Vaccination schedule per flock." },
      { property: "og:title", content: "Vaccination records · KukuThrive" },
      { property: "og:description", content: "Vaccination schedule per flock." },
    ],
  }),
  component: Page,
});

function Page() {
  return <VaccinationList />;
}
