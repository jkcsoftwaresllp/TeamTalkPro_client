import React, { useState, useEffect, useCallback, useRef } from 'react'
import styles from './MessageItem.module.css'

export default function MessageItem({
  message,
  isSender,
  formatTimestamp,
  onEdit,
  onDelete,
  onUpdate,
  isEditing,
  onCancelEdit,
}) 
{
  const { senderInitial, senderName, text, timestamp, status, type, mediaUrl, fileName } = message
  const [editText, setEditText] = useState(text || '')
  const textareaRef = useRef(null)

  useEffect(() => {
    setEditText(text || '')
  }, [text])

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.selectionStart = textareaRef.current.value.length
    }
  }, [isEditing])

  const handleSave = useCallback(() => {
    const trimmed = editText.trim()
    if (trimmed.length === 0) {
      alert('Message cannot be empty.')
      return
    }
    onUpdate(message.id, trimmed)
  }, [editText, onUpdate, message.id])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSave()
    }
    if (e.key === 'Escape') {
      onCancelEdit()
    }
  }

  return (
    <article
      className={`${styles.message} ${isSender ? styles.sender : styles.receiver}`}
      aria-label={`${senderName} message`}
      role="group"
      tabIndex={0} 
    >
      <div className={styles.avatar} aria-hidden="true">
        {senderInitial}
      </div>
      <div className={styles.content}>
        {!isSender && <div className={styles.senderName}>{senderName}</div>}

        {isEditing ? (
          <div className={styles.editingContainer}>
            <textarea
              ref={textareaRef}
              className={styles.editingTextarea}
              rows={2}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Edit message text"
            />
            <div className={styles.editingActions}>
              <button
                type="button"
                className={styles.saveBtn}
                onClick={handleSave}
                aria-label="Save edited message"
              >
                Save
              </button>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={onCancelEdit}
                aria-label="Cancel editing"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            {type === 'text' && <div className={styles.messageText}>{text}</div>}

            {type === 'media' && mediaUrl && (
              <div className={styles.messageMedia}>
                {(mediaUrl.startsWith('video') || mediaUrl.endsWith('.mp4')) ? (
                  <video src={mediaUrl} controls className={styles.mediaElement} />
                ) : (
                  <img src={mediaUrl} alt="Media content" className={styles.mediaElement} />
                )}
              </div>
            )}

            {type === 'file' && (
              <div
                className={styles.messageFile}
                tabIndex={0}
                role="link"
                aria-label={`Download file ${fileName}`}
                onClick={() => {
                  if (mediaUrl) window.open(mediaUrl, '_blank')
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    if (mediaUrl) window.open(mediaUrl, '_blank')
                  }
                }}
              >
                📎 {fileName}
              </div>
            )}

            <div className={isSender ? styles.meta + ' ' + styles.senderMeta : styles.meta}>
              <time dateTime={new Date(timestamp).toISOString()} className={isSender ? styles.timeWhite : ''}>
                {formatTimestamp(timestamp)}
              </time>
              {isSender && (
                <span className={styles.status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              )}
            </div>
          </>
        )}
      </div>
      {isSender && !isEditing && (
        <div className={styles.actions} aria-label="Message actions">
          <button
            type="button"
            className={styles.actionBtn}
            onClick={() => onEdit(message.id)}
            aria-label="Edit message"
            title="Edit message"
          >
            ✏️
          </button>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={() => {
              if (window.confirm('Delete this message?')) {
                onDelete(message.id)
              }
            }}
            aria-label="Delete message"
            title="Delete message"
          >
            🗑️
          </button>
        </div>
      )}
    </article>
  )
}
