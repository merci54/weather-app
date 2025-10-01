import Container from "@/components/Container/Container";
import css from "./page.module.css";
import SearchForm from "@/components/SearchForm/SearchForm";

export default function Home() {
  return (
    <main className={css.main}>
      <Container>
        <h1 className={css.title}>How’s the sky looking today?</h1>
        <div className={css.mainContent}>
          <SearchForm />
        </div>
      </Container>
    </main>
  );
}
