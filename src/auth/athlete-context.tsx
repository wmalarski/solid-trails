import {
  type Accessor,
  type Component,
  createContext,
  createMemo,
  type ParentProps,
  useContext,
} from "solid-js";
import type { Athlete } from "./types";

const AthleteContext = createContext<Accessor<Athlete | null>>(() => {
  throw new Error("AthleteContext not defined");
});

type AthleteProviderProps = ParentProps<{
  athlete?: Athlete | null;
}>;

export const AthleteProvider: Component<AthleteProviderProps> = (props) => {
  const value = createMemo(() => props.athlete ?? null);

  return (
    <AthleteContext.Provider value={value}>
      {props.children}
    </AthleteContext.Provider>
  );
};

export const useAthleteContext = () => {
  return useContext(AthleteContext);
};
