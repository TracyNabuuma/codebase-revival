import { createFileRoute } from "@tanstack/react-router";

import { ExpenseCategoriesScreen } from "@/features/expense-categories/ExpenseCategoriesScreen";

export const Route = createFileRoute("/_app/expense-categories")({
  head: () => ({
    meta: [
      { title: "Expense categories · KukuThrive" },
      { name: "description", content: "Categories used to group spending." },
      { property: "og:title", content: "Expense categories · KukuThrive" },
      { property: "og:description", content: "Categories used to group spending." },
    ],
  }),
  component: Page,
});

function Page() {
  return <ExpenseCategoriesScreen />;
}
