"use client";

import {
  getLocationByCoords,
  getUserInfo,
  getWeather,
} from "@/lib/api/weatherAPI";
import { useUnitsStore } from "@/lib/stores/unitsStore";
import { useEffect, useState } from "react";
import { Location } from "@/types/location";
import Loader from "../Loader/Loader";

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
  const [isLoading, setIsLoading] = useState(true);

  const setDefaultWeather = async () => {
    try {
      const defaultCoords = await getUserInfo("Berlin");
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
    } catch (error) {
      console.error("Failed to set default weather:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    const getAutoWeather = async () => {
      if (!navigator.geolocation) {
        console.log("Geolocation is not supported");
        await setDefaultWeather();
        return;
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      };

      const success = async (position: GeolocationPosition) => {
        try {
          const { latitude, longitude } = position.coords;
          const coords: Location = { latitude, longitude };

          console.log("Got coordinates:", latitude, longitude);

          const [weather, locationInfo] = await Promise.all([
            getWeather(coords, temp, speed, precipitation),
            getLocationByCoords(coords),
          ]);

          const current = {
            feelsLike: Math.trunc(weather.current.apparent_temperature),
            humidity: weather.current.relative_humidity_2m,
            wind: Math.trunc(weather.current.wind_speed_10m),
            precipitation: weather.current.precipitation,
            temperature: Math.trunc(weather.current.temperature_2m),
            weatherCode: weather.current.weather_code,
          };

          setCurrentWeather(current);

          if (locationInfo) {
            setCountry(locationInfo.country);
            setCity(locationInfo.city);
            console.log(
              "Location found:",
              locationInfo.city,
              locationInfo.country
            );
          } else {
            setCountry("Your Location");
            setCity(`${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`);
          }
        } catch (error) {
          console.error("Failed to get weather from geolocation:", error);
          await setDefaultWeather();
        } finally {
          setIsLoading(false);
        }
      };

      const error = async (err: GeolocationPositionError) => {
        console.log("Geolocation error:", err);
        await setDefaultWeather();
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
    };

    getAutoWeather();
  }, [
    hasHydrated,
    temp,
    speed,
    precipitation,
    setCurrentWeather,
    setCountry,
    setCity,
  ]);

  if (isLoading) {
    return <Loader />;
  }

  return null;
}
