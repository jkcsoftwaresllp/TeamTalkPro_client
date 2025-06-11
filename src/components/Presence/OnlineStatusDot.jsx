import React from "react";
import styles from "./OnlineStatusDot.module.css";

const OnlineStatusDot = ({ isOnline }) => (
  <span
    className={`${styles.dot} ${isOnline ? styles.online : styles.offline}`}
  ></span>
);

export default OnlineStatusDot;
