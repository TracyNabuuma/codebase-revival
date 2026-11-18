import { createFileRoute } from "@tanstack/react-router";

import { SalesNew } from "@/features/sales/SalesNew";

export const Route = createFileRoute("/_app/sales/new")({
  head: () => ({
    meta: [
      { title: "New sale · KukuThrive" },
      { name: "description", content: "Record a new egg or bird sale." },
      { property: "og:title", content: "New sale · KukuThrive" },
      { property: "og:description", content: "Record a new egg or bird sale." },
    ],
  }),
  component: Page,
});

function Page() {
  return <SalesNew />;
}
