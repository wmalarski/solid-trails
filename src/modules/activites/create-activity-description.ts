import { type Accessor, createMemo } from "solid-js";
import { createDateFormatter } from "~/utils/formatters/create-date-formatter";
import { createTimeFormatter } from "~/utils/formatters/create-time-formatter";
import type { Activity } from "../trails/types";

export const createActivityDescription = (args: Accessor<Activity>) => {
  const dateFormatter = createDateFormatter();
  const timeFormatter = createTimeFormatter();

  return createMemo(() => {
    const startDate = new Date(args().start_date);
    return `${dateFormatter(startDate)}, ${timeFormatter(startDate)}`;
  });
};
