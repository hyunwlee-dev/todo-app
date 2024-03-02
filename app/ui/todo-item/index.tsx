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
      className={clsx(styles.item, { [styles.shadow]: !props.disabled }, className)}
    >
      <CheckboxButton
        className={styles['checkbox-button']}
        checked={checked}
        onChange={handleCheckboxChecked}
      />
      {
        props.disabled ?
          <span
            className={clsx(
              {
                [styles.checked]: checked,
                [styles.disabled]: props.disabled
              }, styles.input)}
          >
            {props.value}
          </span>
          :
          <input
            className={clsx(
              {
                [styles.checked]: checked,
                [styles.disabled]: props.disabled
              }, styles.input)}
            {...props}
          />
      }
      {children}
    </div>
  );
}

