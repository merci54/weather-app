"use client";

import Container from "@/components/Container/Container";
import Image from "next/image";
import { useEffect } from "react";
import css from "./ErrorPage.module.css";

interface ErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={css.error}>
      <Container>
        <div className={css.wrapper}>
          <Image
            src={"/icons/error.svg"}
            width={42}
            height={50}
            alt="error icon"
          />
          <h2 className={css.title}>Something went wrong!</h2>
          <p className={css.text}>
            We couldn’t connect to the server (API error). Please try again in a
            few moments.
          </p>
          <button className={css.btn} onClick={() => reset()}>
            <Image
              src={"/icons/retry.svg"}
              width={16}
              height={16}
              alt="retry icon"
            />
            <span>Retry</span>
          </button>
        </div>
      </Container>
    </div>
  );
}
