import { createFileRoute } from "@tanstack/react-router";

import { CustomerStatement } from "@/features/customers/CustomerStatement";

export const Route = createFileRoute("/_app/customers/$id")({
  head: () => ({
    meta: [
      { title: "Customer statement · KukuThrive" },
      { name: "description", content: "Sales and payments for one customer." },
      { property: "og:title", content: "Customer statement · KukuThrive" },
      { property: "og:description", content: "Sales and payments for one customer." },
    ],
  }),
  component: Page,
});

function Page() {
  return <CustomerStatement />;
}
