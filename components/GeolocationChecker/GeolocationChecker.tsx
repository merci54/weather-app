"use client";

import { getWeather } from "@/lib/api/weatherAPI";
import { useUnitsStore } from "@/lib/stores/unitsStore";
import { useEffect } from "react";
import { Location } from "@/types/location";
import axios from "axios";

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

  const getLocationByCoords = async (coords: Location) => {
    try {
      const response = await axios.get(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`
      );

      return {
        city: response.data.city || response.data.locality || "Unknown City",
        country: response.data.countryName || "Unknown Country",
      };
    } catch (error) {
      console.error("Failed to get location info from BigDataCloud:", error);

      try {
        const fallbackResponse = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=&latitude=${coords.latitude}&longitude=${coords.longitude}&count=1`
        );

        if (
          fallbackResponse.data.results &&
          fallbackResponse.data.results.length > 0
        ) {
          return {
            city: fallbackResponse.data.results[0].name,
            country: fallbackResponse.data.results[0].country,
          };
        }
      } catch (fallbackError) {
        console.error("Fallback geocoding also failed:", fallbackError);
      }
    }

    return null;
  };

  const setDefaultWeather = async () => {
    try {
      const defaultCoords: Location = { latitude: 51.5074, longitude: -0.1278 };
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

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (currentWeather && currentWeather.temperature !== 0) {
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
