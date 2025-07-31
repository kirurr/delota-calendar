import { setMonth } from "date-fns";

import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import { ProcessedDateType } from "./day";
import clsx from "clsx";

export function Calendar({
  startDate,
  month,
  calendarDays,
  today,
  onMonthChange,
  className,
}: {
  startDate: Date;
  month: number;
  calendarDays: ProcessedDateType[];
  today: ProcessedDateType;
  onMonthChange: (date: Date) => void;
  className?: string;
}) {
  const daysTypes: Map<number, ProcessedDateType[]> = new Map();

  calendarDays.forEach((day) => {
    daysTypes.set(day.key, [...(daysTypes.get(day.key) || []), day]);
  });

  const modifiers = Object.fromEntries(
    Array.from(daysTypes.entries()).map(([key, days]) => [
      key.toString(),
      days.map((d) => d.date),
    ]),
  );
  const modifiersStyles: { [k: string]: any } = Object.fromEntries(
    Array.from(daysTypes.entries()).map(([key, days]) => [
      key.toString(),
      {
        backgroundColor: `hsl(${days[0].day.bgH},${days[0].day.bgS}%,${days[0].day.bgL}%)`,
        color: `hsl(${days[0].day.textH},${days[0].day.textS}%,${days[0].day.textL}%)`,
      },
    ]),
  );
  //@ts-ignore
  modifiersStyles.today = {
    fontWeight: "bold",
  };
  return (
    <div className={clsx(className, "w-fit")}>
      <DayPicker
        animate
        disabled={{ before: startDate }}
        month={setMonth(new Date(), month)}
        onMonthChange={onMonthChange}
        today={today.date}
        captionLayout="label"
        navLayout="around"
        startMonth={startDate}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        showOutsideDays
        classNames={{
          day: `${getDefaultClassNames().day} rounded-lg`,
          month_grid: `${getDefaultClassNames().month_grid} border-separate! border-spacing-1`,
          button_next: `${getDefaultClassNames().button_next} rounded-lg text-red-500 bg-red-500`,
          button_previous: `${getDefaultClassNames().button_previous} rounded-lg`,
        }}
        styles={{
          root: {
            //@ts-ignore
            "--rdp-accent-color": `hsl(${today.day.bgH},${today.day.bgS}%,${today.day.bgL - 30}%)`,
            "--rdp-outside-opacity": 0.3,
          },
        }}
      />
    </div>
  );
}
