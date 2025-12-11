"use client";

import { useEffect, useState } from "react";
import { getMonthDays } from "@/lib/getMonthDays";
import { HabitType } from "./HabitList";

interface HabitDayMap {
  [key: string]: boolean;
}

export default function HabitCalendar({ habit }: { habit: HabitType }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const days = getMonthDays(year, month);

  const [completedDays, setCompletedDays] = useState<HabitDayMap>({});

  useEffect(() => {
    async function loadDays() {
      const res = await fetch(`/api/habits/days?habitId=${habit._id}`);
      const data = await res.json();

      const map: HabitDayMap = {};
      data.forEach((d: { date: string; completed: boolean }) => {
        map[d.date] = d.completed;
      });

      setCompletedDays(map);
    }

    loadDays();
  }, [habit]);

  async function toggleDay(day: number) {
    const date = `${year}-${month + 1}-${day}`;

    const res = await fetch("/api/habits/toggle", {
      method: "POST",
      body: JSON.stringify({ habitId: habit._id, date }),
    });

    const updated = await res.json();

    setCompletedDays((prev) => ({
      ...prev,
      [date]: updated.completed,
    }));
  }

  return (
    <div className="mt-1">
      <h2 className="text-xl font-bold mb-4">
        {habit.name} – {today.toLocaleString("default", { month: "long" })} {year}
      </h2>

      <div className="grid grid-cols-7 gap-2 p-5 ">
        {days.map((day) => {
          const dateKey = `${year}-${month + 1}-${day}`;
          const done = completedDays[dateKey];

          return (
            <button
              key={dateKey}
              onClick={() => toggleDay(day)}
              className={`h-20 border rounded flex items-center justify-center  text-3xl
              ${done ? "bg-green-500  text-white" : "bg-black "}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
