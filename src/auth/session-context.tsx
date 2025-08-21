import type { User } from "better-auth";
import {
  type Accessor,
  type Component,
  createContext,
  createMemo,
  type ParentProps,
  useContext,
} from "solid-js";

const SessionContext = createContext<Accessor<null | User | undefined>>(() => {
  throw new Error("SessionContext not defined");
});

type SessionProviderProps = ParentProps<{
  user?: null | User;
}>;

export const SessionProvider: Component<SessionProviderProps> = (props) => {
  const value = createMemo(() => props.user);

  return (
    <SessionContext.Provider value={value}>
      {props.children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => {
  return useContext(SessionContext);
};
