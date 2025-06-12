import React from 'react';
import OnlineStatusDot from './OnlineStatusDot';
import styles from './styles/MessageBubble.module.css';

function MessageBubble({ message }) {
  const isSender = message.isSender;

  return (
    <div className={`${styles.bubble} ${isSender ? styles.sender : styles.receiver}`}>
      {!isSender && (
        <div className={styles.meta}>
          <OnlineStatusDot isOnline={message.user.isOnline} />
          <strong>{message.user.username}</strong>
        </div>
      )}
      <p>{message.content}</p>
    </div>
  );
}
export default MessageBubble;