import { InputHTMLAttributes, useId } from "react";
import clsx from "clsx";
import A11yHidden from "@/app/ui/a11y-hidden";
import styles from "./checkbox-button.module.css";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
}

export default function CheckboxButton({ checked, className, children, ...props }: IProps) {
  const checkboxId = useId();
  return (
    <>
      <label
        className={clsx(styles['checkbox-label'], { [styles.checked]: checked }, className)}
        htmlFor={checkboxId}
      />
      <A11yHidden
        as='input'
        type="checkbox"
        className={styles['checkbox-input']}
        id={checkboxId}
        {...props}
      >
      </A11yHidden>
    </>
  );
}
