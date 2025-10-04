"use client";

import { getWeather } from "@/lib/api/weatherAPI";
import { useUnitsStore } from "@/lib/stores/unitsStore";
import axios from "axios";
import { useEffect, useState } from "react";

export default function GeolocationChecker() {
  const {
    temp,
    speed,
    precipitation,
    setCurrentWeather,
    setCountry,
    setCity,
    hasHydrated,
  } = useUnitsStore();

  useEffect(() => {
    if (!hasHydrated) return;

    const getWeatherByIP = async () => {
      try {
        const { data: ipData } = await axios("https://ipapi.co/json/");

        const weather = await getWeather(
          { latitude: ipData.latitude, longitude: ipData.longitude },
          temp,
          speed,
          precipitation
        );

        const current = {
          feelsLike: Math.trunc(weather.current.apparent_temperature),
          humidity: weather.current.relative_humidity_2m,
          wind: Math.trunc(weather.current.wind_speed_10m),
          precipitation: weather.current.precipitation,
          temperature: Math.trunc(weather.current.temperature_2m),
          weatherCode: weather.current.weather_code,
        };

        setCurrentWeather(current);
        setCountry(ipData.country_name);
        setCity(ipData.city);
      } catch (error) {
        console.log("IP location failed, trying geolocation...");
        tryGetPreciseLocation();
      }
    };

    const tryGetPreciseLocation = () => {
      if (!navigator.geolocation) {
        return;
      }

      const options = {
        enableHighAccuracy: false,
        timeout: 3000,
        maximumAge: 300000,
      };

      const success = async ({ coords }: GeolocationPosition) => {
        try {
          const weather = await getWeather(
            { latitude: coords.latitude, longitude: coords.longitude },
            temp,
            speed,
            precipitation
          );

          const current = {
            feelsLike: Math.trunc(weather.current.apparent_temperature),
            humidity: weather.current.relative_humidity_2m,
            wind: Math.trunc(weather.current.wind_speed_10m),
            precipitation: weather.current.precipitation,
            temperature: Math.trunc(weather.current.temperature_2m),
            weatherCode: weather.current.weather_code,
          };

          setCurrentWeather(current);
        } catch (error) {
          console.error("Failed to get weather:", error);
        }
      };

      const error = () => {
        setDefaultWeather();
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
    };

    const setDefaultWeather = async () => {
      try {
        const defaultCoords = { latitude: 51.5074, longitude: -0.1278 };
        const weather = await getWeather(
          defaultCoords,
          temp,
          speed,
          precipitation
        );

        const current = {
          feelsLike: Math.trunc(weather.current.apparent_temperature),
          humidity: weather.current.relative_humidity_2m,
          wind: Math.trunc(weather.current.wind_speed_10m),
          precipitation: weather.current.precipitation,
          temperature: Math.trunc(weather.current.temperature_2m),
          weatherCode: weather.current.weather_code,
        };

        setCurrentWeather(current);
        setCountry("United Kingdom");
        setCity("London");
      } catch (error) {
        console.error("Failed to set default weather:", error);
      }
    };

    getWeatherByIP();
  }, [
    hasHydrated,
    temp,
    speed,
    precipitation,
    setCurrentWeather,
    setCountry,
    setCity,
  ]);

  return null;
}
