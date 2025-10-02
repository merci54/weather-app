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
    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,precipitation&hourly=temperature_2m&temperature_unit=${temp}&wind_speed_unit=${speed}&precipitation_unit=${precipitation}&timezone=auto`
  );

  return res.data;
};
