"use client";

import { getWeather, getReverseGeocoding } from "@/lib/api/weatherAPI";
import { useUnitsStore } from "@/lib/stores/unitsStore";
import { useEffect } from "react";
import { Location } from "@/types/location";

export default function GeolocationChecker() {
  const {
    temp,
    speed,
    precipitation,
    setCurrentWeather,
    setCountry,
    setCity,
    hasHydrated,
    currentWeather,
  } = useUnitsStore();

  const setDefaultWeather = async () => {
    try {
      const defaultCoords: Location = { latitude: 51.5074, longitude: -0.1278 };
      const weather = await getWeather(
        defaultCoords,
        temp,
        speed,
        precipitation
      );
      const locationInfo = await getReverseGeocoding(defaultCoords);

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
        setCity(locationInfo.name);
      } else {
        setCountry("United Kingdom");
        setCity("London");
      }
    } catch (error) {
      console.error("Failed to set default weather:", error);
    }
  };

  useEffect(() => {
    if (!hasHydrated || currentWeather) {
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
        maximumAge: 300000,
      };

      const success = async (position: GeolocationPosition) => {
        try {
          const { latitude, longitude } = position.coords;
          const coords: Location = { latitude, longitude };

          const [weather, locationInfo] = await Promise.all([
            getWeather(coords, temp, speed, precipitation),
            getReverseGeocoding(coords),
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
            setCity(locationInfo.name);
          } else {
            setCountry("Your Location");
            setCity(`${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`);
          }

          console.log("Weather loaded successfully from geolocation");
        } catch (error) {
          console.error("Failed to get weather from geolocation:", error);
          await setDefaultWeather();
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
    currentWeather,
    temp,
    speed,
    precipitation,
    setCurrentWeather,
    setCountry,
    setCity,
  ]);

  return null;
}
