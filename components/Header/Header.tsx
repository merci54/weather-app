import Image from "next/image";
import Container from "../Container/Container";
import css from "./Header.module.css";

export default function Header() {
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

          <button className={css.unitsBtn}>
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
        </div>
      </Container>
    </header>
  );
}
