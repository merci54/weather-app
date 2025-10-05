"use client";

import Image from "next/image";
import css from "./HourlyForecast.module.css";
import { useMemo, useState } from "react";
import { useUnitsStore } from "@/lib/stores/unitsStore";
import { formatTime, getDayOfWeek, getWeatherIcon } from "@/lib/api/weatherAPI";
export default function HourlyForecast() {
  const [isOpen, setIsOpen] = useState(false);
  const { hourlyForecast, dailyForecast, selectedDay, setSelectedDay } =
    useUnitsStore();

  const getHourlyDataForSelectedDay = useMemo(() => {
    if (!hourlyForecast.time.length) {
      return { time: [], temperature: [], weatherCode: [] };
    }

    // Фильтруем данные по выбранному дню
    const indices = [];
    for (let i = 0; i < hourlyForecast.time.length; i++) {
      const date = hourlyForecast.time[i].split("T")[0];
      if (date === selectedDay) {
        indices.push(i);
      }
    }

    // Берем до 8 часов для выбранного дня
    const slicedIndices = indices.slice(0, 8);

    return {
      time: slicedIndices.map((i) => hourlyForecast.time[i]),
      temperature: slicedIndices.map((i) => hourlyForecast.temperature[i]),
      weatherCode: slicedIndices.map((i) => hourlyForecast.weatherCode[i]),
    };
  }, [hourlyForecast, selectedDay]);

  const handleDaySelect = (day: string) => {
    setSelectedDay(day);
    setIsOpen(false);
  };

  return (
    <section className={css.forecast}>
      <div className={css.header}>
        <h2 className={css.title}>Hourly Forecast</h2>
        <button onClick={() => setIsOpen(!isOpen)} className={css.button}>
          <span>{getDayOfWeek(selectedDay)}</span>
          <Image
            src={"/icons/under.svg"}
            width={12}
            height={18}
            alt="under icon"
          />
        </button>

        {isOpen && (
          <div className={css.dropdown}>
            <ul className={css.dropdownList}>
              {dailyForecast.time.map((time) => (
                <li
                  key={time}
                  className={`${css.dropdownItem} ${
                    time === selectedDay ? css.active : ""
                  }`}
                  onClick={() => handleDaySelect(time)}
                >
                  <button className={css.switchBtn}>
                    {getDayOfWeek(time)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <ul className={css.hourlyList}>
        {getHourlyDataForSelectedDay.time.map((time, index) => (
          <li key={time} className={css.hourlyItem}>
            <Image
              src={getWeatherIcon(
                getHourlyDataForSelectedDay.weatherCode[index]
              )}
              width={40}
              height={40}
              alt="weather icon"
            />
            <p className={css.time}>{formatTime(time)}</p>
            <p className={css.degree}>
              {getHourlyDataForSelectedDay.temperature[index]}°
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
