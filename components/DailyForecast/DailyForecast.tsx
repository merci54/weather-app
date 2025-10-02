import Image from "next/image";
import css from "./DailyForecast.module.css";

export default function DailyForecast() {
  return (
    <section className={css.forecast}>
      <h2 className={css.title}>Daily forecast</h2>
      <div className={css.wrapper}>
        <ul className={css.dailyList}>
          <li className={css.dailyItem}>
            <p>Tue</p>
            <Image
              src={"/clouds/rain.png"}
              width={60}
              height={60}
              alt="drizzle icon"
            />
            <div className={css.degreeBlock}>
              <p className={css.day}>20&deg;</p>
              <p className={css.night}>14&deg;</p>
            </div>
          </li>
          <li className={css.dailyItem}>
            <p>Wed</p>
            <Image
              src={"/clouds/drizzle.png"}
              width={60}
              height={60}
              alt="drizzle icon"
            />
            <div className={css.degreeBlock}>
              <p className={css.day}>21&deg;</p>
              <p className={css.night}>15&deg;</p>
            </div>
          </li>
          <li className={css.dailyItem}>
            <p>Thu</p>
            <Image
              src={"/clouds/clear-sunny.png"}
              width={60}
              height={60}
              alt="drizzle icon"
            />
            <div className={css.degreeBlock}>
              <p className={css.day}>24&deg;</p>
              <p className={css.night}>14&deg;</p>
            </div>
          </li>
          <li className={css.dailyItem}>
            <p>Fri</p>
            <Image
              src={"/clouds/partly-cloudy.png"}
              width={60}
              height={60}
              alt="partly cloudy icon"
            />
            <div className={css.degreeBlock}>
              <p className={css.day}>25&deg;</p>
              <p className={css.night}>13&deg;</p>
            </div>
          </li>
          <li className={css.dailyItem}>
            <p>Sat</p>
            <Image
              src={"/clouds/thunderstorms.png"}
              width={60}
              height={60}
              alt="thunderstorms icon"
            />
            <div className={css.degreeBlock}>
              <p className={css.day}>21&deg;</p>
              <p className={css.night}>15&deg;</p>
            </div>
          </li>
          <li className={css.dailyItem}>
            <p>Sun</p>
            <Image
              src={"/clouds/drizzle.png"}
              width={60}
              height={60}
              alt="drizzle icon"
            />
            <div className={css.degreeBlock}>
              <p className={css.day}>25&deg;</p>
              <p className={css.night}>16&deg;</p>
            </div>
          </li>
          <li className={css.dailyItem}>
            <p>Tue</p>
            <Image
              src={"/clouds/drizzle.png"}
              width={60}
              height={60}
              alt="drizzle icon"
            />
            <div className={css.degreeBlock}>
              <p className={css.day}>24&deg;</p>
              <p className={css.night}>15&deg;</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
