import { createFileRoute } from "@tanstack/react-router";

import { ExpensesList } from "@/features/expenses/ExpensesList";

export const Route = createFileRoute("/_app/expenses/")({
  head: () => ({
    meta: [
      { title: "Expenses · KukuThrive" },
      { name: "description", content: "Farm spending by category and supplier." },
      { property: "og:title", content: "Expenses · KukuThrive" },
      { property: "og:description", content: "Farm spending by category and supplier." },
    ],
  }),
  component: Page,
});

function Page() {
  return <ExpensesList />;
}
