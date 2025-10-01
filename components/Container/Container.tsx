import css from "./Container.module.css";

export default function Container({ children }: { children: React.ReactNode }) {
  return <div className={css.container}>{children}</div>;
}
