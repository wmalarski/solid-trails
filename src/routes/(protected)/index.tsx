import { clientOnly } from "@solidjs/start";

const TrailsMap = clientOnly(() =>
  import("~/modules/trails/trails-map").then((module) => ({
    default: module.TrailsMap,
  })),
);

export default function Home() {
  return <TrailsMap />;
}
