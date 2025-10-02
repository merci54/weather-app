"use client";

import { getWeather } from "@/lib/api/weatherAPI";
import { useUnitsStore } from "@/lib/stores/unitsStore";
import { useEffect } from "react";

export default function GeolocationChecker() {
  const { temp, speed, precipitation, setCurrentWeather } = useUnitsStore();
  useEffect(() => {
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
      };
      setCurrentWeather(current);
    };

    const error = () => {};

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [temp, speed, precipitation, setCurrentWeather]);

  return null;
}
