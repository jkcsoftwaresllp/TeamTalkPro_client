// src/components/Chat/ChatWindow.jsx
import React, { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import TypingIndicator from './TypingIndicator';
import { createSocket } from './socket';
import styles from './styles/ChatWindow.module.css';

function ChatWindow({ chatId }) {
  const [message, setMessage] = useState('');
  const [typingUsers, setTypingUsers] = useState([]);
  const socketRef = useRef(null);
  const inputRef = useRef();

  useEffect(() => {
    socketRef.current = createSocket();
    const socket = socketRef.current;

    socket.emit('join-room', chatId);

    socket.on('user:typing', (user) => {
      setTypingUsers((prev) => [...new Set([...prev, user])]);
    });

    socket.on('user:stopTyping', (user) => {
      setTypingUsers((prev) => prev.filter((u) => u !== user));
    });

    return () => {
      socket.emit('leave-room', chatId);
      socket.off('user:typing');
      socket.off('user:stopTyping');
      socket.disconnect();
    };
  }, [chatId]);

  const handleTyping = () => {
    socketRef.current?.emit('user:typing', { chatId });
  };

  const handleStopTyping = () => {
    socketRef.current?.emit('user:stopTyping', { chatId });
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    // emit message here if needed: socketRef.current?.emit('message', { chatId, content: message })
    setMessage('');
    handleStopTyping();
  };

  return (
    <div className={styles.container}>
      <MessageList chatId={chatId} />
      <TypingIndicator users={typingUsers} />
      <div className={styles.inputBar}>
        <input
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={handleTyping}
          onBlur={handleStopTyping}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;
