import React from "react";
import styles from "./MessageBubble.module.css";

const MessageBubble = ({ message }) => {
  const { senderId, text, timestamp } = message;
  const isMine = senderId === "me";

  return (
    <div className={`${styles.bubble} ${isMine ? styles.me : styles.them}`}>
      <p>{text}</p>
      <small>{new Date(timestamp).toLocaleTimeString()}</small>
    </div>
  );
};

export default MessageBubble;

