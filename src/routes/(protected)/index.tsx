import { ClientOnly } from "@ark-ui/solid";
import { TrailsMap } from "~/modules/map/trails-map";
import { TrailsBoard } from "~/modules/trails/trails-board";

export default function Home() {
  return (
    <>
      <TrailsMap />
      <ClientOnly>
        <TrailsBoard />
      </ClientOnly>
    </>
  );
}
