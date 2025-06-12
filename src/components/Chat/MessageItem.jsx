import React from 'react'
import styles from './MessageItem.module.css'

function formatTimestamp(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function MessageItem({ message, isSender }) {
  const {
    senderName,
    senderInitial,
    text,
    type,
    mediaUrl,
    fileName,
    timestamp,
    status
  } = message

  return (
    <div className={`${styles.messageItem} ${isSender ? styles.sender : styles.receiver}`}>
      <div className={styles.avatar}>{senderInitial}</div>
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.name}>{senderName}</span>
          <span className={styles.time}>{formatTimestamp(timestamp)}</span>
        </div>
        {type === 'text' && <div className={styles.text}>{text}</div>}
        {type === 'media' && (
          <div className={styles.media}>
            {mediaUrl && (
              <>
                {mediaUrl.endsWith('.mp4') ? (
                  <video src={mediaUrl} controls className={styles.video} />
                ) : (
                  <img src={mediaUrl} alt="media" className={styles.image} />
                )}
              </>
            )}
            {text && <div className={styles.text}>{text}</div>}
          </div>
        )}
        {type === 'file' && (
          <div className={styles.file}>
            <a href={mediaUrl} download={fileName}>{fileName}</a>
            {text && <div className={styles.text}>{text}</div>}
          </div>
        )}
        <div className={styles.status}>{isSender && status}</div>
      </div>
    </div>
  )
}
