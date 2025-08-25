import { Map as OlMap, View } from "ol";
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
import "./open-layers.css";

const createOpenLayer = () => {
  const raster = new TileLayer({
    source: new OSM(),
  });

  const source = new VectorSource({
    wrapX: false,
  });

  const vector = new VectorLayer({
    source,
  });

  const map = new OlMap({
    layers: [raster, vector],
    target: "map",
    view: new View({
      center: [0, 0],
      zoom: 2,
    }),
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
