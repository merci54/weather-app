"use client";

import Image from "next/image";
import css from "./HourlyForecast.module.css";
import { useState } from "react";
export default function HourlyForecast() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className={css.forecast}>
      <div className={css.header}>
        <h2 className={css.title}>Hourly Forecast</h2>
        <button onClick={() => setIsOpen(!isOpen)} className={css.button}>
          <span>Tuesday</span>
          <Image
            src={"/icons/under.svg"}
            width={12}
            height={18}
            alt="under icon"
          />
        </button>

        {isOpen && (
          <div className={css.dropdown}>
            <button className={css.switchBtn}>Monday</button>
            <button className={`${css.switchBtn} ${css.active}`}>
              Tuesday
            </button>
            <button className={css.switchBtn}>Wednesday</button>
            <button className={css.switchBtn}>Thursday</button>
            <button className={css.switchBtn}>Friday</button>
            <button className={css.switchBtn}>Saturday</button>
            <button className={css.switchBtn}>Sunday</button>
          </div>
        )}
      </div>
      <ul className={css.hourlyList}>
        <li className={css.hourlyItem}>
          <Image
            src={"/clouds/overcast.png"}
            width={40}
            height={40}
            alt="cloud icon"
          />
          <p className={css.time}>3 PM</p>
          <p className={css.degree}>20&deg;</p>
        </li>
        <li className={css.hourlyItem}>
          <Image
            src={"/clouds/overcast.png"}
            width={40}
            height={40}
            alt="cloud icon"
          />
          <p className={css.time}>4 PM</p>
          <p className={css.degree}>20&deg;</p>
        </li>
        <li className={css.hourlyItem}>
          <Image
            src={"/clouds/overcast.png"}
            width={40}
            height={40}
            alt="cloud icon"
          />
          <p className={css.time}>5 PM</p>
          <p className={css.degree}>20&deg;</p>
        </li>
        <li className={css.hourlyItem}>
          <Image
            src={"/clouds/overcast.png"}
            width={40}
            height={40}
            alt="cloud icon"
          />
          <p className={css.time}>5 PM</p>
          <p className={css.degree}>20&deg;</p>
        </li>
        <li className={css.hourlyItem}>
          <Image
            src={"/clouds/overcast.png"}
            width={40}
            height={40}
            alt="cloud icon"
          />
          <p className={css.time}>5 PM</p>
          <p className={css.degree}>20&deg;</p>
        </li>
        <li className={css.hourlyItem}>
          <Image
            src={"/clouds/overcast.png"}
            width={40}
            height={40}
            alt="cloud icon"
          />
          <p className={css.time}>5 PM</p>
          <p className={css.degree}>20&deg;</p>
        </li>
      </ul>
    </section>
  );
}
