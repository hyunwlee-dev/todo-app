import styles from "./skeletons.module.css";

export function TodoListSkeleton() {
  return (
    <div className={styles.outer}>
      <div className={styles.shimmer} />
      <div className={styles.shimmer} />
    </div>
  );
}


