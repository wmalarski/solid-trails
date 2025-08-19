import { createMemo } from "solid-js";
import { useI18n } from "./i18n";

export const createDateFormatter = () => {
  const { locale } = useI18n();

  const formatter = createMemo(
    () =>
      new Intl.DateTimeFormat(locale(), {
        dateStyle: "medium",
        hour12: false,
        timeStyle: "medium",
      }),
  );
  return (date: string | Date) => formatter().format(new Date(date));
};
