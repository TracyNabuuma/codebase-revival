import { createFileRoute } from "@tanstack/react-router";

import { AssistantScreen } from "@/features/kukuthrive/AssistantScreen";

export const Route = createFileRoute("/_app/assistant")({
  head: () => ({
    meta: [
      { title: "Investigation assistant · KukuThrive" },
      { name: "description", content: "Ask questions about your flock and get evidence-based explanations and suggested checks." },
      { property: "og:title", content: "Investigation assistant · KukuThrive" },
      { property: "og:description", content: "Ask questions about your flock and get evidence-based explanations and suggested checks." },
    ],
  }),
  component: Page,
});

function Page() {
  return <AssistantScreen />;
}
