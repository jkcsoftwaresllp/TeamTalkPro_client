import React, { useState, useRef, useEffect, useCallback } from 'react'
import EmojiPicker from './EmojiPicker'
import styles from './ChatInput.module.css'

// Generate unique ID for new messages
function generateId() {
  return 'msg-' + Math.random().toString(36).slice(2, 11)
}

export default function ChatInput({ currentUser, onSend, disabled }) {
  const [text, setText] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)
  const textareaRef = useRef(null)
  const emojiButtonRef = useRef(null)

  const toggleEmojiPicker = useCallback(() => {
    setShowEmojiPicker((v) => !v)
  }, [])

  const onSelectEmoji = useCallback(
    (emoji) => {
      const input = textareaRef.current
      if (!input) return
      const start = input.selectionStart
      const end = input.selectionEnd
      const newValue = text.slice(0, start) + emoji + text.slice(end)
      setText(newValue)
      setShowEmojiPicker(false)
      setTimeout(() => {
        input.focus()
        input.selectionStart = input.selectionEnd = start + emoji.length
      }, 0)
    },
    [text]
  )

  const onFileChange = (e) => {
    if (e.target.files.length) {
      setSelectedFile(e.target.files[0])
    }
  }

  const clearFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    textareaRef.current?.focus()
  }

  const handleSend = (e) => {
    e.preventDefault()
    if ((!text.trim() && !selectedFile) || disabled) return

    const message = {
      id: generateId(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderInitial: currentUser.initial,
      text: '',
      type: 'text',
      mediaUrl: '',
      fileName: '',
      timestamp: Date.now(),
      status: 'sent',
      isEditing: false,
    }

    if (selectedFile) {
      if (
        selectedFile.type.startsWith('image/') ||
        selectedFile.type.startsWith('video/')
      ) {
        message.type = 'media'
        message.mediaUrl = URL.createObjectURL(selectedFile)
        message.fileName = selectedFile.name
        message.text = text.trim()
      } else {
        message.type = 'file'
        message.fileName = selectedFile.name
        message.text = text.trim()
      }
    } else {
      message.type = 'text'
      message.text = text.trim()
    }

    onSend(message)
    setText('')
    clearFile()
  }

  const isSendDisabled = disabled || (!text.trim() && !selectedFile)

  useEffect(() => {
    if (!showEmojiPicker) return
    const handleClickOutside = (event) => {
      if (
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(event.target) &&
        !event.target.closest(`.${styles.emojiPicker}`)
      ) {
        setShowEmojiPicker(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [showEmojiPicker])

  return (
    <form className={styles.chatInput} onSubmit={handleSend} aria-label="Send message">
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message"
        aria-label="Message input"
        disabled={disabled}
      />
      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.emojiBtn}
          onClick={toggleEmojiPicker}
          aria-label="Toggle emoji picker"
          title="Emoji picker"
          ref={emojiButtonRef}
          tabIndex={0}
          disabled={disabled}
        >
          😊
        </button>
        <label
          htmlFor="file-upload"
          className={styles.fileLabel}
          title="Attach file"
          tabIndex={0}
          aria-label="Attach file"
        >
          📎
          <input
            type="file"
            id="file-upload"
            onChange={onFileChange}
            ref={fileInputRef}
            className={styles.fileInput}
            aria-hidden="true"
            tabIndex={-1}
            disabled={disabled}
          />
        </label>
        <button
          type="submit"
          className={styles.sendBtn}
          aria-label="Send message"
          disabled={isSendDisabled}
        >
          ➤
        </button>
      </div>
      {showEmojiPicker && (
        <div className={styles.emojiPicker}>
          <EmojiPicker onSelect={onSelectEmoji} />
        </div>
      )}
      {selectedFile && (
        <div
          className={styles.filePreview}
          role="region"
          aria-live="polite"
          aria-atomic="true"
        >
          {selectedFile.type.startsWith('image/') ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Selected file preview"
              className={styles.filePreviewImg}
            />
          ) : (
            <div className={styles.filePreviewText}>{selectedFile.name}</div>
          )}
          <button
            type="button"
            className={styles.fileRemoveBtn}
            onClick={clearFile}
            aria-label="Remove selected file"
            title="Remove file"
          >
            ×
          </button>
        </div>
      )}
    </form>
  )
}
