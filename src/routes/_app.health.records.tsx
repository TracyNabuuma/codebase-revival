import { createFileRoute } from "@tanstack/react-router";

import { HealthList } from "@/features/health/HealthList";

export const Route = createFileRoute("/_app/health/records")({
  head: () => ({
    meta: [
      { title: "Health records · KukuThrive" },
      { name: "description", content: "Flock health, treatments and visits." },
      { property: "og:title", content: "Health records · KukuThrive" },
      { property: "og:description", content: "Flock health, treatments and visits." },
    ],
  }),
  component: Page,
});

function Page() {
  return <HealthList />;
}
