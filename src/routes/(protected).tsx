import type { RouteDefinition, RouteSectionProps } from "@solidjs/router";
import { getIsAuthorizedServerQuery } from "~/modules/auth/actions";

export const route = {
  load: async () => {
    await getIsAuthorizedServerQuery();
  },
} satisfies RouteDefinition;

export default function ProtectedLayout(props: RouteSectionProps) {
  return <>{props.children}</>;
}
