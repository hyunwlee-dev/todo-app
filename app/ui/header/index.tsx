import { HTMLAttributes } from "react";
import Logo from "@/app/ui/logo";
import ThemeButton from "@/app/ui/theme-button";
import Container from "@/app/ui/container";
import clsx from "clsx";
import styles from "./header.module.css";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}
export default function Header({ className }: IProps) {
  return (
    <Container as='header' className={clsx(styles.header, className)}>
      <Logo />
      <ThemeButton />
    </Container>
  );
}
