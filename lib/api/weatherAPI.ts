import { UserInfo } from "@/types/info";
import { Location } from "@/types/location";
import axios from "axios";

interface CoordinatesResponse {
  results: UserInfo[];
}

export const getUserInfo = async (location: string) => {
  const { data } = await axios.get<CoordinatesResponse>(
    `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1`
  );
  return data.results[0];
};

export const getWeather = async (
  location: Location,
  temp: "celsius" | "fahrenheit",
  speed: "kmh" | "mph",
  precipitation: "mm" | "inch"
) => {
  const res = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,precipitation,weather_code&hourly=temperature_2m&temperature_unit=${temp}&wind_speed_unit=${speed}&precipitation_unit=${precipitation}&timezone=auto`
  );

  return res.data;
};

export const getWeatherIcon = (weatherCode: number): string => {
  switch (weatherCode) {
    case 0:
      return "/clouds/clear-sunny.png";

    case 1:
    case 2:
      return "/clouds/partly-cloudy.png";

    case 3:
      return "/clouds/overcast.png";

    case 45:
    case 48:
      return "/clouds/fog.png";

    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return "/clouds/drizzle.png";

    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return "/clouds/rain.png";

    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return "/clouds/snow.png";

    case 95:
    case 96:
    case 99:
      return "/clouds/thunderstorms.png";

    default:
      return "/clouds/overcast.png";
  }
};
export function capitalizeFirstLetter(city: string) {
  return city.charAt(0).toUpperCase() + city.slice(1);
}

export const getFormattedDate = () => {
  const now = new Date();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = daysOfWeek[now.getDay()];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthName = months[now.getMonth()];
  const dateNumber = now.getDate();
  const year = now.getFullYear();

  return `${dayName}, ${monthName} ${dateNumber}, ${year}`;
};

export const getReverseGeocoding = async (coords: Location) => {
  try {
    const response = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?latitude=${coords.latitude}&longitude=${coords.longitude}&count=1`
    );

    if (response.data.results && response.data.results.length > 0) {
      return response.data.results[0];
    }

    return null;
  } catch (error) {
    console.error("Reverse geocoding failed:", error);
    return null;
  }
};
