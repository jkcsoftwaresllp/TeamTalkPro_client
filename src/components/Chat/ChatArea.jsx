import React from 'react'
import ChatInput from './ChatInput'
import MessageList from './MessageList'
import { socket } from "../../socket";
import styles from './ChatArea.module.css'

const currentUser = {
  id: 'user1',
  name: 'You',
  initial: 'Y'
}

export default function ChatArea({ messages }) {
  const handleSendMessage = (message) => {
    socket.emit('sendMessage', message)
  }

  return (
    <div className={styles.chatArea}>
      <MessageList messages={messages} />
      <ChatInput currentUser={currentUser} onSend={handleSendMessage} disabled={false} />
    </div>
  )
}
