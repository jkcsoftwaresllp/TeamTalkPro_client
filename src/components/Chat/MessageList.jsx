import React from 'react'
import MessageItem from './MessageItem'
import styles from './MessageList.module.css'

export default function MessageList({ messages = [], currentUser }) {
  return (
    <div className={styles.messageList}>
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          message={msg}
          isSender={msg.senderId === currentUser.id}
        />
      ))}
    </div>
  )
}
