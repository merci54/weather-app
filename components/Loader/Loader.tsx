"use client";

import { useEffect } from "react";
import css from "./Loader.module.css";

export default function Loader() {
  useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div className={css.wrapper}>
      <span className={css.loader}></span>
    </div>
  );
}
