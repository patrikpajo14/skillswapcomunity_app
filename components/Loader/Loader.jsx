import React from "react";
import styles from "./Loader.module.css";
import clsx from "clsx";

const Loader = ({ sx }) => {
  return (
    <div className={clsx(styles.loader, sx)}>
      <div className={styles.wrapper}>
        <div className={styles.circle}></div>
        <div className={styles.line1}></div>
        <div className={styles.line2}></div>
        <div className={styles.line3}></div>
        <div className={styles.line4}></div>
      </div>
    </div>
  );
};

export default Loader;
