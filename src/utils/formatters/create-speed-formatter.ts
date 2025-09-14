import { createMemo } from "solid-js";
import { useI18n } from "~/integrations/i18n";

export const createSpeedFormatter = () => {
  const { locale } = useI18n();

  const formatter = createMemo(() => new Intl.NumberFormat(locale()));
  return (metersPerSecond: number) =>
    `${formatter().format(metersPerSecond * 3.6)} km/h`;
};
