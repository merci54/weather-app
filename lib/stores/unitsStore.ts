import {
  CurrentWeather,
  DailyForecastStore,
  HourlyForecastStore,
} from "@/types/weather";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UnitsStore = {
  temp: "celsius" | "fahrenheit";
  speed: "kmh" | "mph";
  precipitation: "mm" | "inch";
  hasHydrated: boolean;
  currentWeather: CurrentWeather;
  hourlyForecast: HourlyForecastStore;
  dailyForecast: DailyForecastStore;
  country: string;
  city: string;
  selectedDay: string;
  setSelectedDay: (day: string) => void;
  setTemp: (newTemp: "celsius" | "fahrenheit") => void;
  setSpeed: (newSpeed: "kmh" | "mph") => void;
  setPrecipitation: (newPrecipitation: "mm" | "inch") => void;
  setCountry: (newCountry: string) => void;
  setCity: (newCity: string) => void;
  setCurrentWeather: (newCurrentWeather: CurrentWeather) => void;
  setHasHydrated: (state: boolean) => void;
  setHourlyForecast: (hourlyForecast: HourlyForecastStore) => void;
  setDailyForecast: (dailyForecast: DailyForecastStore) => void;
};

export const useUnitsStore = create<UnitsStore>()(
  persist(
    (set) => ({
      temp: "celsius",
      speed: "kmh",
      precipitation: "mm",
      country: "Germany",
      city: "Berlin",
      currentWeather: {
        feelsLike: 0,
        humidity: 0,
        wind: 0,
        precipitation: 0,
        temperature: 0,
        weatherCode: 0,
      },
      hasHydrated: false,
      hourlyForecast: {
        time: [],
        temperature: [],
        weatherCode: [],
      },
      dailyForecast: {
        time: [],
        weatherCode: [],
        maxTemp: [],
        minTemp: [],
      },
      selectedDay: new Date().toISOString().split("T")[0],
      setSelectedDay: (day) => set({ selectedDay: day }),

      setTemp: (newTemp) => set({ temp: newTemp }),
      setSpeed: (newSpeed) => set({ speed: newSpeed }),
      setPrecipitation: (newPrecipitation) =>
        set({ precipitation: newPrecipitation }),
      setCountry: (newCountry) => set({ country: newCountry }),
      setCity: (newCity) => set({ city: newCity }),
      setCurrentWeather: (newCurrentWeather) =>
        set({ currentWeather: newCurrentWeather }),
      setHasHydrated: (state) => set({ hasHydrated: state }),
      setDailyForecast: (dailyForecast) => set({ dailyForecast }),
      setHourlyForecast: (hourlyForecast) => set({ hourlyForecast }),
    }),

    {
      name: "units-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
