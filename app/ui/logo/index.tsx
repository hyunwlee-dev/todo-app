import { HTMLAttributes } from "react";
import Link from "next/link";
import clsx from "clsx";
import styles from "./logo.module.css";

interface IProps extends HTMLAttributes<HTMLAnchorElement> {
}

export default function Logo({ className, children, ...props }: IProps) {
  return (
    <Link href={'#'} className={clsx(styles.logo, className)} {...props}>
      <h1>TODO</h1>
    </Link>
  );
}
