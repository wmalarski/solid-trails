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

const OSM_SOURCE = "https://outdoor.tiles.freemap.sk/{z}/{x}/{y}@{s}";
const OSM_ATTRIBUTIONS = `<a href="https://www.freemap.sk">© Freemap Slovakia</a>`;

const createOpenLayer = () => {
  const raster = new TileLayer({
    source: new OSM({ attributions: [OSM_ATTRIBUTIONS], url: OSM_SOURCE }),
  });

  const source = new VectorSource({ wrapX: false });
  const vector = new VectorLayer({ source });

  const view = createPeristedView();

  const map = new OlMap({
    controls: [],
    layers: [raster, vector],
    target: "map",
    view,
  });

  return { map, raster, source, vector };
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
