import { createFileRoute } from "@tanstack/react-router";

import { FlockDetail } from "@/features/flocks/FlockDetail";

export const Route = createFileRoute("/_app/flocks/$id")({
  head: () => ({
    meta: [
      { title: "Flock detail · KukuThrive" },
      { name: "description", content: "Eggs, mortality and weights for one flock." },
      { property: "og:title", content: "Flock detail · KukuThrive" },
      { property: "og:description", content: "Eggs, mortality and weights for one flock." },
    ],
  }),
  component: Page,
});

function Page() {
  return <FlockDetail />;
}
