import React, { useState } from "react";
import ChatWindow from "../components/ChatHistory/ChatWindow";
import OnlineStatusDot from "../components/Presence/OnlineStatusDot";
import TypingIndicator from "../components/Presence/TypingIndicator";

const ChatPage = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  return (
    <div>
      <h2>
        Chat with Alice <OnlineStatusDot isOnline={isOnline} />
      </h2>
      <TypingIndicator isTyping={isTyping} senderName="Alice" />
      <ChatWindow conversationId="123" />
    </div>
  );
};

export default ChatPage;