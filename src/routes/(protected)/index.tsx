import { clientOnly } from "@solidjs/start";
import { Suspense } from "solid-js";
import { TrailsLoadingSpinner } from "~/modules/trails/trails-loading-spinner";

const TrailsMap = clientOnly(
  () =>
    import("~/modules/trails/trails-map").then((module) => ({
      default: module.TrailsMap,
    })),
  { lazy: true },
);

export default function Home() {
  return (
    <Suspense fallback={<TrailsLoadingSpinner />}>
      <TrailsMap />
    </Suspense>
  );
}
