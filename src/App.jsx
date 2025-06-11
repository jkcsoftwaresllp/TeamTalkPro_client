import React, { useState, useEffect, useCallback, useRef } from 'react'
import { io } from 'socket.io-client'
import Header from './components/Header'
import ChatArea from './components/ChatArea'
import ChatInput from './components/ChatInput'
import styles from './App.module.css'

const SERVER_URL = 'http://localhost:3001' 

const currentUser = {
  id: 'user1',
  name: 'You',
  initial: 'Y',
}


function formatTimestamp(ts) {
  const date = new Date(ts)
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()
  if (isToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  return (
    date.toLocaleDateString([], { month: 'short', day: 'numeric' }) +
    ', ' +
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  )
}

export default function App() {
  const [messages, setMessages] = useState([])
  const [editingId, setEditingId] = useState(null)
  const socketRef = useRef(null)
  const chatEndRef = useRef(null)

  // Connect socket 
  useEffect(() => {
    socketRef.current = io(SERVER_URL)

    socketRef.current.on('connect', () => {
      console.log('Connected to server via socket.io')
    })

    // Receive messages from server
    socketRef.current.on('receiveMessage', (message) => {
      setMessages((msgs) => {
        if (msgs.find((m) => m.id === message.id)) return msgs
        return [...msgs, message]
      })
    })

    return () => {
      socketRef.current.disconnect()
    }
  }, [])

  // Send message to server and add locally
  const addMessage = useCallback(
    (message) => {
      setMessages((msgs) => [...msgs, message])
      setEditingId(null)
      socketRef.current.emit('sendMessage', message)
    },
    []
  )

  // Update message locally (editing)
  const updateMessage = useCallback(
    (id, newText) => {
      setMessages((msgs) =>
        msgs.map((m) =>
          m.id === id ? { ...m, text: newText, isEditing: false } : m
        )
      )
      setEditingId(null)
      // optionally emit update event here
    },
    []
  )

  // Delete message locally
  const deleteMessage = useCallback(
    (id) => {
      setMessages((msgs) => msgs.filter((m) => m.id !== id))
      setEditingId(null)
      // optionally emit delete event here
    },
    []
  )

  const startEditing = useCallback(
    (id) => {
      setEditingId(id)
      setMessages((msgs) =>
        msgs.map((m) => ({ ...m, isEditing: m.id === id }))
      )
    },
    []
  )

  const cancelEditing = useCallback(() => {
    setEditingId(null)
    setMessages((msgs) => msgs.map((m) => ({ ...m, isEditing: false })))
  }, [])

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div className={styles.app}>
      <Header />
      <ChatArea
        messages={messages}
        currentUser={currentUser}
        formatTimestamp={formatTimestamp}
        onEdit={startEditing}
        onDelete={deleteMessage}
        onUpdate={updateMessage}
        editingId={editingId}
        onCancelEdit={cancelEditing}
        ref={chatEndRef}
      />
      <ChatInput currentUser={currentUser} onSend={addMessage} disabled={!!editingId} />
    </div>
  )
}
