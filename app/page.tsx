import Container from "@/components/Container/Container";
import css from "./page.module.css";
import SearchForm from "@/components/SearchForm/SearchForm";
import Hero from "@/components/Hero/Hero";
import DailyForecast from "@/components/DailyForecast/DailyForecast";
import HourlyForecast from "@/components/HourlyForecast/HourlyForecast";

export default function Home() {
  return (
    <main className={css.main}>
      <Container>
        <h1 className={css.title}>How’s the sky looking today?</h1>
        <SearchForm />
        <main className={css.mainContent}>
          <div className={css.mainWrapper}>
            <Hero />
            <DailyForecast />
          </div>

          <HourlyForecast />
        </main>
      </Container>
    </main>
  );
}
