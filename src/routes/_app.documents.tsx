import { createFileRoute } from "@tanstack/react-router";

import { DocumentsList } from "@/features/documents/DocumentsList";

export const Route = createFileRoute("/_app/documents")({
  head: () => ({
    meta: [
      { title: "Documents · KukuThrive" },
      { name: "description", content: "Farm licences, receipts and records." },
      { property: "og:title", content: "Documents · KukuThrive" },
      { property: "og:description", content: "Farm licences, receipts and records." },
    ],
  }),
  component: Page,
});

function Page() {
  return <DocumentsList />;
}
