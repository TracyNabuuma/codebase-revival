import { createFileRoute } from "@tanstack/react-router";

import { FeedInventoryScreen } from "@/features/kukuthrive/FeedInventoryScreen";
import { RecordsLink } from "@/features/kukuthrive/ui";

export const Route = createFileRoute("/_app/feed/")({
  head: () => ({
    meta: [
      { title: "Feed & inventory · KukuThrive" },
      { name: "description", content: "Feed purchases, issues to houses, running stock balance and physical counts." },
      { property: "og:title", content: "Feed & inventory · KukuThrive" },
      { property: "og:description", content: "Feed purchases, issues to houses, running stock balance and physical counts." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    (
      <>
        <RecordsLink to="/feed/stock" label="Feed purchases & stock list" />
        <FeedInventoryScreen />
      </>
    )
  );
}
