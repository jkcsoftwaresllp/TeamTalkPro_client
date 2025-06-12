<<<<<<< HEAD
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { fetchMessages } from './api';
import MessageBubble from './MessageBubble';
import useDebounce from './debounce';

const LIMIT = 20;

function MessageList({ chatId }) {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef();

  const loadMessages = useCallback(async () => {
    const data = await fetchMessages(chatId, page);
    if (data.messages.length < LIMIT) setHasMore(false);
    setMessages(prev => [...data.messages.reverse(), ...prev]);
  }, [page, chatId]);

  const debouncedLoad = useDebounce(loadMessages, 250);

  useEffect(() => { debouncedLoad(); }, [debouncedLoad]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) setPage(prev => prev + 1);
    }, { threshold: 1 });
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [loader, hasMore]);

  return (
    <div>
      <div ref={loader}>Loading...</div> {/* ✅ removed styles.loader */}
      {messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
    </div>
  );
}

export default MessageList;
=======
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
>>>>>>> 77d58d972ceac77196f85339b7a2e3006f0ac296
