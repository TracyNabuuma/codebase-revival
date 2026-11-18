import { createFileRoute } from "@tanstack/react-router";

import { PhotoGallery } from "@/features/photos/PhotoGallery";

export const Route = createFileRoute("/_app/photos")({
  head: () => ({
    meta: [
      { title: "Photos · KukuThrive" },
      { name: "description", content: "Flock and farm photos." },
      { property: "og:title", content: "Photos · KukuThrive" },
      { property: "og:description", content: "Flock and farm photos." },
    ],
  }),
  component: Page,
});

function Page() {
  return <PhotoGallery />;
}
