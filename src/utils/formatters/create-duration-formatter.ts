import { createMemo } from "solid-js";
import { useI18n } from "../i18n";

export const createDurationFormatter = () => {
  const { locale } = useI18n();

  const formatter = createMemo(
    () =>
      // biome-ignore lint/suspicious/noExplicitAny: Needs new api
      new (Intl as any).DurationFormat(locale(), { style: "narrow" }),
  );
  return (seconds: number) => formatter().format(secondsToDuration(seconds));
};

const secondsToDuration = (seconds: number) => {
  return {
    days: Math.floor(seconds / (3600 * 24)),
    hours: Math.floor((seconds % (3600 * 24)) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: Math.floor(seconds % 60),
  };
};
