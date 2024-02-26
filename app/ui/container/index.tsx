import { ElementType, HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./container.module.css";

interface IProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

export default function Container({
  as: Component = 'div',
  className,
  children,
  ...props
}: IProps) {
  return (
    <Component className={clsx(styles.container, className)} {...props}>
      {children}
    </Component>
  );
}
