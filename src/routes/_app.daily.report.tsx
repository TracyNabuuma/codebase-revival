import { createFileRoute } from "@tanstack/react-router";

import { DailyReportWizard } from "@/features/daily-operations/DailyReportWizard";

export const Route = createFileRoute("/_app/daily/report")({
  head: () => ({
    meta: [
      { title: "Full daily report · KukuThrive" },
      { name: "description", content: "Record today"s eggs, deaths, feed and water per flock." },
      { property: "og:title", content: "Full daily report · KukuThrive" },
      { property: "og:description", content: "Record today"s eggs, deaths, feed and water per flock." },
    ],
  }),
  component: Page,
});

function Page() {
  return <DailyReportWizard />;
}
