import { createFileRoute } from "@tanstack/react-router";

import { LitterScreen } from "@/features/kukuthrive/LitterScreen";

export const Route = createFileRoute("/_app/litter")({
  head: () => ({
    meta: [
      { title: "Litter · KukuThrive" },
      { name: "description", content: "Litter material, squeeze-test scores, turning and replacement history." },
      { property: "og:title", content: "Litter · KukuThrive" },
      { property: "og:description", content: "Litter material, squeeze-test scores, turning and replacement history." },
    ],
  }),
  component: Page,
});

function Page() {
  return <LitterScreen />;
}
