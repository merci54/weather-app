"use client";

import Image from "next/image";
import Container from "../Container/Container";
import css from "./Header.module.css";
import { useState } from "react";
import { useUnitsStore } from "@/lib/stores/unitsStore";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { temp, speed, precipitation, setTemp, setSpeed, setPrecipitation } =
    useUnitsStore();

  const isMetric =
    temp === "celsius" && speed === "kmh" && precipitation === "mm";

  const switchUnits = () => {
    if (isMetric) {
      setTemp("fahrenheit");
      setSpeed("mph");
      setPrecipitation("inch");
    } else {
      setTemp("celsius");
      setSpeed("kmh");
      setPrecipitation("mm");
    }
  };
  return (
    <header className={css.header}>
      <Container>
        <div className={css.wrapper}>
          <div className={css.logo}>
            <Image
              src={"/icons/weather-logo.svg"}
              width={138}
              height={28}
              alt="logo"
            />
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className={css.unitsBtn}>
            <Image
              src={"/icons/settings.svg"}
              width={14}
              height={14}
              alt="unit icon"
            />
            <span>Units</span>
            <Image
              src={"/icons/under.svg"}
              width={9}
              height={14}
              alt="under icon"
            />
          </button>

          {isOpen && (
            <div className={css.dropdown}>
              <button onClick={switchUnits} className={css.switchBtn}>
                <p>
                  Switch to <span>{isMetric ? "Imperial" : "Metric"}</span>
                </p>
              </button>
              <div className={css.unitBlock}>
                <div className={css.titleBlock}>
                  <p>Temperature</p>
                </div>

                <div className={css.buttonBlock}>
                  <button
                    onClick={() => setTemp("celsius")}
                    className={`${css.selectBtn} ${
                      temp === "celsius" ? css.active : ""
                    }`}
                  >
                    Celsius (&deg;C)
                    {temp === "celsius" && (
                      <Image
                        src={"/icons/success.svg"}
                        width={14}
                        height={17}
                        alt="success icon"
                      />
                    )}
                  </button>
                  <button
                    onClick={() => setTemp("fahrenheit")}
                    className={`${css.selectBtn} ${
                      temp === "fahrenheit" ? css.active : ""
                    }`}
                  >
                    Fahrenheit (&deg;F)
                    {temp === "fahrenheit" && (
                      <Image
                        src={"/icons/success.svg"}
                        width={14}
                        height={17}
                        alt="success icon"
                      />
                    )}
                  </button>
                </div>
              </div>
              <div className={css.unitBlock}>
                <div className={css.titleBlock}>
                  <p>Wind Speed</p>
                </div>

                <div className={css.buttonBlock}>
                  <button
                    onClick={() => setSpeed("kmh")}
                    className={`${css.selectBtn} ${
                      speed === "kmh" ? css.active : ""
                    }`}
                  >
                    km/h
                    {speed === "kmh" && (
                      <Image
                        src={"/icons/success.svg"}
                        width={14}
                        height={17}
                        alt="success icon"
                      />
                    )}
                  </button>
                  <button
                    onClick={() => setSpeed("mph")}
                    className={`${css.selectBtn} ${
                      speed === "mph" ? css.active : ""
                    }`}
                  >
                    mph
                    {speed === "mph" && (
                      <Image
                        src={"/icons/success.svg"}
                        width={14}
                        height={17}
                        alt="success icon"
                      />
                    )}
                  </button>
                </div>
              </div>
              <div className={css.unitBlock}>
                <div className={css.titleBlock}>
                  <p>Precipitation</p>
                </div>

                <div className={css.buttonBlock}>
                  <button
                    onClick={() => setPrecipitation("mm")}
                    className={`${css.selectBtn} ${
                      precipitation === "mm" ? css.active : ""
                    }`}
                  >
                    Millimeters (mm)
                    {precipitation === "mm" && (
                      <Image
                        src={"/icons/success.svg"}
                        width={14}
                        height={17}
                        alt="success icon"
                      />
                    )}
                  </button>
                  <button
                    onClick={() => setPrecipitation("inch")}
                    className={`${css.selectBtn} ${
                      precipitation === "inch" ? css.active : ""
                    }`}
                  >
                    Inches (in)
                    {precipitation === "inch" && (
                      <Image
                        src={"/icons/success.svg"}
                        width={14}
                        height={17}
                        alt="success icon"
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
