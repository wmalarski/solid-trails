import { Map as OlMap } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import {
  type Accessor,
  type Component,
  createContext,
  createMemo,
  type ParentProps,
  useContext,
} from "solid-js";
import { createPeristedView } from "./create-persisted-view";
import "./open-layers.css";

const createOpenLayer = () => {
  const osm = new TileLayer({ source: new OSM({}) });

  const trails = new TileLayer({
    source: new OSM({
      url: "https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png",
    }),
  });

  const source = new VectorSource({ wrapX: false });
  const vector = new VectorLayer({ source });

  const view = createPeristedView();

  const map = new OlMap({
    controls: [],
    layers: [osm, trails, vector],
    target: "map",
    view,
  });

  return { map, source };
};

const OpenLayerContext = createContext<
  Accessor<ReturnType<typeof createOpenLayer>>
>(() => {
  throw new Error("OpenLayerContext is not defined");
});

type OpenLayerProviderProps = ParentProps;

export const OpenLayerProvider: Component<OpenLayerProviderProps> = (props) => {
  const openLayer = createMemo(() => createOpenLayer());

  return (
    <OpenLayerContext.Provider value={openLayer}>
      {props.children}
    </OpenLayerContext.Provider>
  );
};

export const useOpenLayer = () => {
  return useContext(OpenLayerContext);
};
