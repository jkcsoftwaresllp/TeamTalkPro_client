import React, { forwardRef } from 'react'
import MessageList from './MessageList'
import styles from './ChatArea.module.css'

const ChatArea = forwardRef(
  (
    {
      messages,
      currentUser,
      formatTimestamp,
      onEdit,
      onDelete,
      onUpdate,
      editingId,
      onCancelEdit,
    },
    ref
  ) => {
    return (
      <section
        className={styles.chatArea}
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        <MessageList
          messages={messages}
          currentUser={currentUser}
          formatTimestamp={formatTimestamp}
          onEdit={onEdit}
          onDelete={onDelete}
          onUpdate={onUpdate}
          editingId={editingId}
          onCancelEdit={onCancelEdit}
        />
        <div ref={ref} />
      </section>
    )
  }
)

export default ChatArea
