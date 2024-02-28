import { HTMLAttributes, ElementType } from "react";
import clsx from "clsx";
import styles from "./a11y-hidden.module.css";

interface IProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

export default function A11yHidden({
  as: Element = 'div',
  className,
  children,
  ...props
}: IProps) {
  return (
    <Element
      className={clsx(styles['a11y-hidden'], className)}
      {...props}
    >
      {children}
    </Element>
  );
}

