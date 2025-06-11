import React, { useEffect, useState, useRef } from "react";
import MessageList from "./MessageList";
import styles from "./ChatWindow.module.css";
import { mockMessages } from "../../utils/mockData";

const ChatWindow = ({ conversationId }) => {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const chatRef = useRef(null);

  const fetchMessages = async (pageNum) => {
    try {
      const data = mockMessages[pageNum - 1] || [];

      // Merge and remove duplicates by message ID
      setMessages((prev) => {
        const merged = [...data.reverse(), ...prev];
        const uniqueMessages = Array.from(
          new Map(merged.map((msg) => [msg.id, msg])).values()
        );
        return uniqueMessages;
      });

      if (data.length < 10) setHasNextPage(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleScroll = () => {
    if (chatRef.current.scrollTop === 0 && hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchMessages(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div ref={chatRef} className={styles.chatWindow} onScroll={handleScroll}>
      <MessageList messages={messages} />
    </div>
  );
};

export default ChatWindow;
