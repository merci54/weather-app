"use client";

import Image from "next/image";
import css from "./DailyForecast.module.css";
import { useUnitsStore } from "@/lib/stores/unitsStore";
import { getDayOfWeek, getWeatherIcon } from "@/lib/api/weatherAPI";

export default function DailyForecast() {
  const { dailyForecast } = useUnitsStore();
  return (
    <section className={css.forecast}>
      <h2 className={css.title}>Daily forecast</h2>
      <div className={css.wrapper}>
        <ul className={css.dailyList}>
          {dailyForecast.time.map((time, index) => (
            <li key={time} className={css.dailyItem}>
              <p>{getDayOfWeek(time).slice(0, 3)}</p>
              <Image
                src={getWeatherIcon(dailyForecast.weatherCode[index])}
                width={60}
                height={60}
                alt="weather icon"
              />
              <div className={css.degreeBlock}>
                <p className={css.day}>{dailyForecast.maxTemp[index]}°</p>
                <p className={css.night}>{dailyForecast.minTemp[index]}°</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
