import Container from "@/components/Container/Container";
import css from "./NotFound.module.css";
import Link from "next/link";
export default function NotFound() {
  return (
    <div className={css.notFound}>
      <Container>
        <div className={css.wrapper}>
          <h2 className={css.title}>404, This page could not be found!</h2>
          <Link className={css.link} href={"/"}>
            Go to Main page
          </Link>
        </div>
      </Container>
    </div>
  );
}
