import { createFileRoute } from "@tanstack/react-router";

import { CustomersList } from "@/features/customers/CustomersList";

export const Route = createFileRoute("/_app/customers/")({
  head: () => ({
    meta: [
      { title: "Customers · KukuThrive" },
      { name: "description", content: "Customers and what they owe." },
      { property: "og:title", content: "Customers · KukuThrive" },
      { property: "og:description", content: "Customers and what they owe." },
    ],
  }),
  component: Page,
});

function Page() {
  return <CustomersList />;
}
