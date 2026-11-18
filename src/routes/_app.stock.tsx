import { createFileRoute } from "@tanstack/react-router";

import { StockList } from "@/features/stock/StockList";

export const Route = createFileRoute("/_app/stock")({
  head: () => ({
    meta: [
      { title: "Stock · KukuThrive" },
      { name: "description", content: "Farm stock levels." },
      { property: "og:title", content: "Stock · KukuThrive" },
      { property: "og:description", content: "Farm stock levels." },
    ],
  }),
  component: Page,
});

function Page() {
  return <StockList />;
}
