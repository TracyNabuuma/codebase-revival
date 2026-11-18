import { createFileRoute } from "@tanstack/react-router";

import { RecordsLink } from "@/features/kukuthrive/ui";
import { VaccinationScreen } from "@/features/kukuthrive/VaccinationScreen";

export const Route = createFileRoute("/_app/vaccination/")({
  head: () => ({
    meta: [
      { title: "Vaccination & medication · KukuThrive" },
      { name: "description", content: "Farm-owned vaccination schedules, administration checklists and coverage." },
      { property: "og:title", content: "Vaccination & medication · KukuThrive" },
      { property: "og:description", content: "Farm-owned vaccination schedules, administration checklists and coverage." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    (
      <>
        <RecordsLink to="/vaccination/records" label="Vaccination records list" />
        <VaccinationScreen />
      </>
    )
  );
}
