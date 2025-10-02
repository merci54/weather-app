import Image from "next/image";
import css from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={css.hero}>
      <div className={css.cityBlock}>
        <div className={css.textBlock}>
          <h2 className={css.cityName}>Berlin, Germany</h2>
          <p className={css.dateName}>Tuesday, Aug 5, 2025</p>
        </div>
        <div className={css.degreeBlock}>
          <Image
            src={"/clouds/clear-sunny.png"}
            width={120}
            height={120}
            alt="cloud icon"
          />
          <div>
            <p className={css.temperature}>20&deg;</p>
          </div>
        </div>
      </div>
      <div className={css.dataBlock}>
        <ul className={css.dataList}>
          <li className={css.dataItem}>
            <p className={css.dataItemText}>Feels Like</p>
            <span className={css.dataItemValue}>18&deg;</span>
          </li>
          <li className={css.dataItem}>
            <p className={css.dataItemText}>Humidity</p>
            <span className={css.dataItemValue}>46%</span>
          </li>
          <li className={css.dataItem}>
            <p className={css.dataItemText}>Wind</p>
            <span className={css.dataItemValue}>14 km/h</span>
          </li>
          <li className={css.dataItem}>
            <p className={css.dataItemText}>Precipitation</p>
            <span className={css.dataItemValue}>0 mm</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
