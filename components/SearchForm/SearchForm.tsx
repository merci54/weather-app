"use client";

import { Field, Form, Formik, FormikHelpers } from "formik";
import css from "./SearchForm.module.css";
import * as Yup from "yup";
import {
  capitalizeFirstLetter,
  getUserInfo,
  getWeather,
} from "@/lib/api/weatherAPI";
import { useUnitsStore } from "@/lib/stores/unitsStore";
import toast from "react-hot-toast";

interface FormValues {
  city: string;
}

const formSchema = Yup.object().shape({
  city: Yup.string().required("City is required"),
});

export default function SearchForm() {
  const { setCurrentWeather, setCountry, setCity, temp, speed, precipitation } =
    useUnitsStore();

  const initialValues: FormValues = {
    city: "",
  };

  const handleSubmit = async (
    value: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      const userInfo = await getUserInfo(value.city);
      if (!userInfo) {
        return toast.error("City was not found. Try again");
      }
      const coords = {
        latitude: userInfo.latitude,
        longitude: userInfo.longitude,
      };
      const country = userInfo.country;
      const weather = await getWeather(coords, temp, speed, precipitation);

      if (!weather || !weather.current) {
        return toast.error("Weather data not available. Try again");
      }

      const current = {
        feelsLike: Math.trunc(weather.current.apparent_temperature),
        humidity: weather.current.relative_humidity_2m,
        wind: Math.trunc(weather.current.wind_speed_10m),
        precipitation: weather.current.precipitation,
        temperature: Math.trunc(weather.current.temperature_2m),
        weatherCode: weather.current.weather_code,
      };

      setCurrentWeather(current);
      setCountry(country);
      setCity(capitalizeFirstLetter(value.city));
      resetForm();
    } catch (error) {
      toast.error("City was not found. Try again");
      console.log(error);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={formSchema}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <Field
            className={css.cityInput}
            id="city"
            name="city"
            placeholder="Search for a place..."
            type="text"
          />
          <button className={css.submitBtn} type="submit">
            {isSubmitting ? "Searching..." : "Search"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
