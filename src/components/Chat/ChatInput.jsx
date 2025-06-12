import React, { useState, useRef, useEffect, useCallback } from 'react'
import EmojiPicker from './EmojiPicker'
import styles from './ChatInput.module.css'

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

  const onSelectEmoji = useCallback((emoji) => {
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
  }, [text])

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
      text: text.trim(),
      type: 'text',
      mediaUrl: '',
      fileName: '',
      timestamp: Date.now(),
      status: 'sent'
    }

    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile)
      if (selectedFile.type.startsWith('image/') || selectedFile.type.startsWith('video/')) {
        message.type = 'media'
        message.mediaUrl = url
      } else {
        message.type = 'file'
        message.mediaUrl = url
      }
      message.fileName = selectedFile.name
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
    <form className={styles.chatInput} onSubmit={handleSend}>
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message"
        disabled={disabled}
      />
      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.emojiBtn}
          onClick={toggleEmojiPicker}
          ref={emojiButtonRef}
          disabled={disabled}
        >😊</button>
        <label htmlFor="file-upload" className={styles.fileLabel}>
          📎
          <input
            type="file"
            id="file-upload"
            onChange={onFileChange}
            ref={fileInputRef}
            className={styles.fileInput}
            disabled={disabled}
          />
        </label>
        <button
          type="submit"
          className={styles.sendBtn}
          disabled={isSendDisabled}
        >➤</button>
      </div>
      {showEmojiPicker && (
        <div className={styles.emojiPicker}>
          <EmojiPicker onSelect={onSelectEmoji} />
        </div>
      )}
      {selectedFile && (
        <div className={styles.filePreview}>
          {selectedFile.type.startsWith('image/') ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Preview"
              className={styles.filePreviewImg}
            />
          ) : (
            <div className={styles.filePreviewText}>{selectedFile.name}</div>
          )}
          <button
            type="button"
            className={styles.fileRemoveBtn}
            onClick={clearFile}
            title="Remove file"
          >×</button>
        </div>
      )}
    </form>
  )
}
