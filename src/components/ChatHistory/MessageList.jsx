import React from "react";
import MessageBubble from "./MessageBubble";

const MessageList = ({ messages }) => (
  <div>
    {messages.map((msg) => (
      <MessageBubble key={msg.id} message={msg} />
    ))}
  </div>
);

export default MessageList;
