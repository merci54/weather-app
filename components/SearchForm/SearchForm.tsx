"use client";

import { Field, Form, Formik } from "formik";
import css from "./SearchForm.module.css";
import * as Yup from "yup";
const formSchema = Yup.object().shape({
  city: Yup.string().required("City is required"),
});

export default function SearchForm() {
  const initialValues = {
    city: "",
  };

  const handleSubmit = async (value: typeof initialValues) => {
    console.log(value);
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
