import React from 'react'
import styles from './EmojiPicker.module.css'

const emojiList = [
  '😀','😃','😄','😁','😆','😅','😂','🤣','😊','😍','🤩','😘',
  '😜','😎','🤓','😕','😢','😭','😠','😇','🤔','🤐','🤢','😷',
  '👍','👎','👊','✌️','👏','🙌','🙏','💪','👀','🔥','❤️','💔'
]

export default function EmojiPicker({ onSelect }) {
  return (
    <>
      {emojiList.map((emoji) => (
        <button
          key={emoji}
          type="button"
          className={styles.emojiBtn}
          title={`Insert emoji ${emoji}`}
          aria-label={`Insert emoji ${emoji}`}
          onClick={() => onSelect(emoji)}
        >
          {emoji}
        </button>
      ))}
    </>
  )
}
