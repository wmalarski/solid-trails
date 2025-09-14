import type { RouteDefinition, RouteSectionProps } from "@solidjs/router";
import { getAthleteServerQuery } from "~/modules/auth/actions";

export const route = {
  load: async () => {
    await getAthleteServerQuery();
  },
} satisfies RouteDefinition;

export default function ProtectedLayout(props: RouteSectionProps) {
  return <>{props.children}</>;
}
