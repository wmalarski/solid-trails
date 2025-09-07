import {
  createAsync,
  type RouteDefinition,
  type RouteSectionProps,
} from "@solidjs/router";
import { AthleteProvider } from "~/auth/athlete-context";
import { getAthleteServerQuery } from "~/modules/auth/actions";

export const route = {
  load: async () => {
    await getAthleteServerQuery();
  },
} satisfies RouteDefinition;

export default function ProtectedLayout(props: RouteSectionProps) {
  const athlete = createAsync(() => getAthleteServerQuery());

  return (
    <AthleteProvider athlete={athlete()}>        
      {props.children}
    </AthleteProvider>
  );
}
