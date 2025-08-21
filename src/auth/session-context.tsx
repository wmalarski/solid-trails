import {
  type Accessor,
  type Component,
  createContext,
  createMemo,
  type ParentProps,
  useContext,
} from "solid-js";
import type { Session } from "./services";

const SessionContext = createContext<Accessor<null | Session | undefined>>(
  () => {
    throw new Error("SessionContext not defined");
  },
);

type SessionProviderProps = ParentProps<{
  session?: null | Session;
}>;

export const SessionProvider: Component<SessionProviderProps> = (props) => {
  const value = createMemo(() => props.session);

  return (
    <SessionContext.Provider value={value}>
      {props.children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => {
  return useContext(SessionContext);
};
