import type { User } from "better-auth";
import {
  type Accessor,
  type Component,
  createContext,
  createMemo,
  type ParentProps,
  useContext,
} from "solid-js";

const UserContext = createContext<Accessor<null | User | undefined>>(() => {
  throw new Error("UserContext not defined");
});

type UserProviderProps = ParentProps<{
  user?: null | User;
}>;

export const UserProvider: Component<UserProviderProps> = (props) => {
  const value = createMemo(() => props.user);

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
