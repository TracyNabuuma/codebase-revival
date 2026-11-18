import { createFileRoute } from "@tanstack/react-router";

import { FeedList } from "@/features/stock/FeedList";

export const Route = createFileRoute("/_app/feed/stock")({
  head: () => ({
    meta: [
      { title: "Feed stock records · KukuThrive" },
      { name: "description", content: "Feed stock, deliveries and usage." },
      { property: "og:title", content: "Feed stock records · KukuThrive" },
      { property: "og:description", content: "Feed stock, deliveries and usage." },
    ],
  }),
  component: Page,
});

function Page() {
  return <FeedList />;
}
