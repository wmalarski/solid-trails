import { createDateFormatter } from "~/utils/formatters/create-date-formatter";
import { createTimeFormatter } from "~/utils/formatters/create-time-formatter";
import type { Activity } from "../types";

export const createActivityDescription = () => {
  const dateFormatter = createDateFormatter();
  const timeFormatter = createTimeFormatter();

  return (activity: Activity) => {
    const startDate = new Date(activity.start_date);
    return `${dateFormatter(startDate)}, ${timeFormatter(startDate)}`;
  };
};
