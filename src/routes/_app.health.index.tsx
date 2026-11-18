import { createFileRoute } from "@tanstack/react-router";

import { HealthScreen } from "@/features/kukuthrive/HealthScreen";
import { RecordsLink } from "@/features/kukuthrive/ui";

export const Route = createFileRoute("/_app/health/")({
  head: () => ({
    meta: [
      { title: "Health & veterinary · KukuThrive" },
      { name: "description", content: "Daily health checks, health events, mortality and culls, linked to what happened next." },
      { property: "og:title", content: "Health & veterinary · KukuThrive" },
      { property: "og:description", content: "Daily health checks, health events, mortality and culls, linked to what happened next." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    (
      <>
        <RecordsLink to="/health/records" label="Health records list" />
        <HealthScreen />
      </>
    )
  );
}
