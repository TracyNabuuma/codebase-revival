import { createFileRoute } from "@tanstack/react-router";

import { FlocksList } from "@/features/flocks/FlocksList";

export const Route = createFileRoute("/_app/flocks/")({
  head: () => ({
    meta: [
      { title: "Flocks · KukuThrive" },
      { name: "description", content: "All layer and broiler flocks with live counts and health." },
      { property: "og:title", content: "Flocks · KukuThrive" },
      { property: "og:description", content: "All layer and broiler flocks with live counts and health." },
    ],
  }),
  component: Page,
});

function Page() {
  return <FlocksList />;
}
