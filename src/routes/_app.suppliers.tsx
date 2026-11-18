import { createFileRoute } from "@tanstack/react-router";

import { SuppliersList } from "@/features/expenses/SuppliersList";

export const Route = createFileRoute("/_app/suppliers")({
  head: () => ({
    meta: [
      { title: "Suppliers · KukuThrive" },
      { name: "description", content: "Feed, chick and medicine suppliers." },
      { property: "og:title", content: "Suppliers · KukuThrive" },
      { property: "og:description", content: "Feed, chick and medicine suppliers." },
    ],
  }),
  component: Page,
});

function Page() {
  return <SuppliersList />;
}
