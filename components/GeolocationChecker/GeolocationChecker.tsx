"use client";

import { getWeather } from "@/lib/api/weatherAPI";
import { useUnitsStore } from "@/lib/stores/unitsStore";
import { useEffect } from "react";

export default function GeolocationChecker() {
  const {
    temp,
    speed,
    precipitation,
    currentWeather,
    setCurrentWeather,
    hasHydrated,
  } = useUnitsStore();
  useEffect(() => {
    if (!hasHydrated || currentWeather) return;

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = async ({ coords }: GeolocationPosition) => {
      const weather = await getWeather(coords, temp, speed, precipitation);
      const current = {
        feelsLike: Math.trunc(weather.current.apparent_temperature),
        humidity: weather.current.relative_humidity_2m,
        wind: Math.trunc(weather.current.wind_speed_10m),
        precipitation: weather.current.precipitation,
        temperature: Math.trunc(weather.current.temperature_2m),
        weatherCode: weather.current.weather_code,
      };
      setCurrentWeather(current);
      return current;
    };

    const error = () => {
      setCurrentWeather({
        feelsLike: 0,
        humidity: 0,
        wind: 0,
        precipitation: 0,
        temperature: 0,
        weatherCode: 0,
      });
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [
    hasHydrated,
    currentWeather,
    setCurrentWeather,
    temp,
    speed,
    precipitation,
  ]);

  return null;
}
