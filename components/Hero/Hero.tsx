"use client";

import Image from "next/image";
import css from "./Hero.module.css";
import { useUnitsStore } from "@/lib/stores/unitsStore";
import { getFormattedDate, getWeatherIcon } from "@/lib/api/weatherAPI";

export default function Hero() {
  const { currentWeather, city, country, speed, precipitation } =
    useUnitsStore();

  return (
    <section className={css.hero}>
      <div className={css.cityBlock}>
        <div className={css.textBlock}>
          <h2 className={css.cityName}>
            {country}, {city}
          </h2>
          <p className={css.dateName}>{getFormattedDate()}</p>
        </div>
        <div className={css.degreeBlock}>
          <Image
            src={getWeatherIcon(currentWeather.weatherCode)}
            width={120}
            height={120}
            alt="cloud icon"
          />
          <div>
            <p className={css.temperature}>{currentWeather.temperature}&deg;</p>
          </div>
        </div>
      </div>
      <div className={css.dataBlock}>
        <ul className={css.dataList}>
          <li className={css.dataItem}>
            <p className={css.dataItemText}>Feels Like</p>
            <span className={css.dataItemValue}>
              {currentWeather.feelsLike}&deg;
            </span>
          </li>
          <li className={css.dataItem}>
            <p className={css.dataItemText}>Humidity</p>
            <span className={css.dataItemValue}>
              {currentWeather.humidity}%
            </span>
          </li>
          <li className={css.dataItem}>
            <p className={css.dataItemText}>Wind</p>
            <span className={css.dataItemValue}>
              {currentWeather.wind} {speed === "kmh" ? "km/h" : "mph"}
            </span>
          </li>
          <li className={css.dataItem}>
            <p className={css.dataItemText}>Precipitation</p>
            <span className={css.dataItemValue}>
              {currentWeather.precipitation}{" "}
              {precipitation === "mm" ? "mm" : "in"}
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
