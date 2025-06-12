import React from 'react';
import styles from './styles/OnlineStatusDot.module.css';

function OnlineStatusDot({ isOnline }) {
  return <span className={isOnline ? styles.online : styles.offline}></span>;
}

export default OnlineStatusDot;
