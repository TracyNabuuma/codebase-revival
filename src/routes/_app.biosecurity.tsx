import { createFileRoute } from "@tanstack/react-router";

import { BiosecurityScreen } from "@/features/kukuthrive/BiosecurityScreen";

export const Route = createFileRoute("/_app/biosecurity")({
  head: () => ({
    meta: [
      { title: "Biosecurity · KukuThrive" },
      { name: "description", content: "Recurring hygiene checklists and between-flock cleanout records." },
      { property: "og:title", content: "Biosecurity · KukuThrive" },
      { property: "og:description", content: "Recurring hygiene checklists and between-flock cleanout records." },
    ],
  }),
  component: Page,
});

function Page() {
  return <BiosecurityScreen />;
}
