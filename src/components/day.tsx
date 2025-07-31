"use client";

import { setStartDateAction } from "@/actions";
import clsx from "clsx";
import { add, eachDayOfInterval, format, lastDayOfMonth } from "date-fns";
import { isAfter } from "date-fns/fp";
import { useState } from "react";
import { Calendar as Calendar } from "./calendar";

export type DayType = {
  type: string;
  actions: string[];
  bgH: number;
  bgS: number;
  bgL: number;
  textH: number;
  textS: number;
  textL: number;
};

export type ProcessedDateType = {
  key: number;
  date: Date;
  day: DayType;
};

const daysTypes: Record<number, DayType> = {
  1: {
    type: "Работа (12ч)",
    actions: ["Польский 20–30 мин утром", "Отдых вечером"],
    bgH: 212,
    bgS: 16,
    bgL: 76,
    textH: 211,
    textS: 37,
    textL: 36,
  },
  2: {
    type: "Работа (12ч)",
    actions: ["Польский 20–30 мин утром", "Отдых вечером"],
    bgH: 212,
    bgS: 16,
    bgL: 76,
    textH: 211,
    textS: 37,
    textL: 36,
  },
  3: {
    type: "Колледж + Анатомия",
    actions: ["Колледж", "Анатомия: лекция + скетчи"],
    bgH: 16,
    bgS: 25,
    bgL: 74,
    textH: 18,
    textS: 9,
    textL: 96,
  },
  4: {
    type: "Полный отдых",
    actions: ["Восстановление, без учебы или нагрузки"],
    bgH: 85,
    bgS: 13,
    bgL: 80,
    textH: 11,
    textS: 23,
    textL: 29,
  },
  5: {
    type: "Работа (12ч)",
    actions: ["Польский 20–30 мин утром", "Отдых вечером"],
    bgH: 212,
    bgS: 16,
    bgL: 76,
    textH: 211,
    textS: 37,
    textL: 36,
  },
  6: {
    type: "Работа (12ч)",
    actions: ["Польский 20–30 мин утром", "Отдых вечером"],
    bgH: 212,
    bgS: 16,
    bgL: 76,
    textH: 211,
    textS: 37,
    textL: 36,
  },
  7: {
    type: "Концепт-арт",
    actions: ["Концепт-арт 1.5–2 ч в первой половине дня"],
    bgH: 230,
    bgS: 32,
    bgL: 57,
    textH: 229,
    textS: 12,
    textL: 87,
  },
  8: {
    type: "Вечер анимации",
    actions: ["Свободный день", "Анимация 30–45 мин вечером"],
    bgH: 273,
    bgS: 32,
    bgL: 58,
    textH: 271,
    textS: 9,
    textL: 90,
  },
};

export default function Day({ initDate }: { initDate?: Date }) {
  const todayDate = new Date();
  const [monthNumber, setMonthNumber] = useState<number>(todayDate.getMonth());

  const [startDate, setStartDate] = useState<Date>(
    initDate ?? new Date(todayDate.getFullYear(), todayDate.getMonth(), 1),
  );

  const [endDate, setEndDate] = useState<Date>(
    lastDayOfMonth(
      add(new Date(todayDate.getFullYear(), monthNumber, 1), { months: 1 }),
    ),
  );

  if (isAfter(add(todayDate, { days: 1 }), startDate)) {
    return <div>Начало дня не может быть позже текущего дня</div>;
  }
  let counter = 1;

  const intervalDates = eachDayOfInterval({
    start: startDate || endDate,
    end: endDate,
  });

  const processedDates: ProcessedDateType[] = intervalDates.map((day) => {
    if (counter === Object.keys(daysTypes).length + 1) {
      counter = 1;
    }
    const result = {
      key: parseInt(Object.keys(daysTypes)[counter - 1]),
      date: day,
      day: daysTypes[counter],
    };

    counter++;

    return result;
  });

  const currentDay =
    processedDates[
      processedDates.findIndex(
        (day) => day.date.toDateString() === todayDate.toDateString(),
      )
    ];

  function calendarOnMonthChange(date: Date) {
    setMonthNumber(date.getMonth());
    setEndDate(
      lastDayOfMonth(
        add(new Date(date.getFullYear(), date.getMonth(), 1), { months: 1 }),
      ),
    );
  }

  return (
    <div
      className="size-full h-screen flex flex-col justify-center items-center"
      style={{
        backgroundColor: `hsl(${currentDay.day.bgH},${currentDay.day.bgS}%,${currentDay.day.bgL}%)`,
      }}
    >
      <main
        className="px-32 py-16 rounded-lg shadow-md mx-auto gap-16 w-fit"
        style={{
          backgroundColor: `hsl(${currentDay.day.bgH},${currentDay.day.bgS}%,${currentDay.day.bgL + 25}%)`,
          color: `hsl(${currentDay.day.bgH},${currentDay.day.bgS}%,${currentDay.day.bgL - 30}%)`,
        }}
      >
        <div className="w-full text-center pb-8">
          <h1 className="text-6xl text-bold mb-4 tracking-widest">
            {currentDay.day.type}
          </h1>
          <ul>
            {currentDay.day.actions.map((day, i) => (
              <li
                key={i}
                style={{
                  color: `hsl(${currentDay.day.bgH},${currentDay.day.bgS + 10}%,${currentDay.day.bgL - 15}%)`,
                }}
                className="font-bold text-2xl tracking-wide"
              >
                {day}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full flex flex-row gap-16 justify-center">
          <div>
            <div className="mx-auto w-fit">
              <label htmlFor="date" className="text-lg">
                дата отсчета
              </label>
              <input
                type="date"
                id="date"
                className="rounded-lg border-2 p-1 ml-2 px-2 text-center text-xl"
                style={{}}
                onChange={async (e) => {
									if (e.target.value === "") {
										return;
									}
                  setStartDate(new Date(e.target.value));
                  const result = await setStartDateAction(
                    new Date(e.target.value),
                  );
                  if (!result.status) {
                    alert(result.error);
                  }
                }}
                value={format(startDate, "yyyy-MM-dd")}
                max={format(todayDate, "yyyy-MM-dd")}
								required
              />
            </div>
            <Calendar
              startDate={startDate}
              month={monthNumber}
              calendarDays={processedDates}
              today={currentDay}
              onMonthChange={calendarOnMonthChange}
            />
          </div>
          <ol className="list-decimal list-inside">
            {Object.entries(daysTypes).map(([key, day]) => (
              <li
                key={key}
                style={{
                  color: `hsl(${day.bgH},${day.bgS + 10}%,${day.bgL - 15}%)`,
                }}
                className="font-bold text-xl"
              >
                {day.type}
              </li>
            ))}
          </ol>
        </div>
      </main>
    </div>
  );
}
