import Image from "next/image";
import css from "./HourlyForecast.module.css";
export default function HourlyForecast() {
  return (
    <section className={css.forecast}>
      <div className={css.header}>
        <h2 className={css.title}>Hourly Forecast</h2>
        <button className={css.button}>
          <span>Tuesday</span>
          <Image
            src={"/icons/under.svg"}
            width={12}
            height={18}
            alt="under icon"
          />
        </button>
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
      </ul>
    </section>
  );
}
