import React from "react";
import styles from "./TypingIndicator.module.css";

const TypingIndicator = ({ isTyping, senderName }) =>
  isTyping ? <p className={styles.typing}>{senderName} is typing...</p> : null;

export default TypingIndicator;

