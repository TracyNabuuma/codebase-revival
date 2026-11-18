import { createFileRoute } from "@tanstack/react-router";

import { ReportPacks } from "@/features/kukuthrive/ReportPacks";
import { ReportsScreen } from "@/features/reports/ReportsScreen";

export const Route = createFileRoute("/_app/reports")({
  head: () => ({
    meta: [
      { title: "Reports · KukuThrive" },
      { name: "description", content: "Printable farm reports." },
      { property: "og:title", content: "Reports · KukuThrive" },
      { property: "og:description", content: "Printable farm reports." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    (
      <>
        <ReportsScreen />
        <ReportPacks />
      </>
    )
  );
}
