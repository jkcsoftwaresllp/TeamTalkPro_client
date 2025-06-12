import React from 'react';
import styles from './styles/TypingIndicator.module.css';

function TypingIndicator({ users }) {
  if (!users.length) return null;
  return (
    <div className={styles.indicator}>
      {users.join(', ')} {users.length === 1 ? 'is' : 'are'} typing...
    </div>
  );
}

export default TypingIndicator;