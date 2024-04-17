import { component$ } from "@builder.io/qwik";

type FormatDateStringProps = {
  dateString: string;
  timeZone: string;
};

export const FormatDateString = component$(
  ({ dateString, timeZone }: FormatDateStringProps) => {
    const hour = new Date().getHours();
    const minutes = new Date().getMinutes();
    let dateTime = dateString;
    if (!/\d{2}:\d{2}/.test(dateString)) {
      dateTime += ` ${hour}:${minutes}`;
    }

    const date = new Date(dateTime);

    return date.toLocaleDateString(undefined, {
      timeZone: timeZone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  },
);
