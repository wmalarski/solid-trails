import { createMemo } from "solid-js";
import { useI18n } from "../i18n";

export const createDistanceFormatter = () => {
  const { locale } = useI18n();

  const formatter = createMemo(() => new Intl.NumberFormat(locale()));
  return (meters: number) => `${formatter().format(meters)} m`;
};
