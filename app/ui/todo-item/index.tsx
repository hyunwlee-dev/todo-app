import React, { InputHTMLAttributes } from "react";
import CheckboxButton from "@/app/ui/checkbox-button";
import clsx from "clsx";
import styles from "./todo-item.module.css";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  handleCheckboxChecked: () => void;
}

export default function TodoItem({
  checked,
  handleCheckboxChecked,
  className,
  children,
  ...props
}: IProps) {
  return (
    <div
      className={clsx(styles.item, className)}
    >
      <CheckboxButton
        className={styles['checkbox-button']}
        checked={checked}
        onChange={handleCheckboxChecked}
      />
      <input
        className={styles.input}
        {...props}
      />
      {children}
    </div>
  );
}

