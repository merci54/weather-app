import { CurrentWeather } from "@/types/weather";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UnitsStore = {
  temp: "celsius" | "fahrenheit";
  speed: "kmh" | "mph";
  precipitation: "mm" | "inch";
  hasHydrated: boolean;
  currentWeather: CurrentWeather;
  country: string;
  city: string;
  setTemp: (newTemp: "celsius" | "fahrenheit") => void;
  setSpeed: (newSpeed: "kmh" | "mph") => void;
  setPrecipitation: (newPrecipitation: "mm" | "inch") => void;
  setCountry: (newCountry: string) => void;
  setCity: (newCity: string) => void;
  setCurrentWeather: (newCurrentWeather: CurrentWeather) => void;
  setHasHydrated: (state: boolean) => void;
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

      setTemp: (newTemp) => set({ temp: newTemp }),
      setSpeed: (newSpeed) => set({ speed: newSpeed }),
      setPrecipitation: (newPrecipitation) =>
        set({ precipitation: newPrecipitation }),
      setCountry: (newCountry) => set({ country: newCountry }),
      setCity: (newCity) => set({ city: newCity }),
      setCurrentWeather: (newCurrentWeather) =>
        set({ currentWeather: newCurrentWeather }),
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),

    {
      name: "units-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
