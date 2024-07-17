import React, { useState } from "react";
import chatbootImg from "../../assets/chatbot-icon.png";
import axios from 'axios';

interface ChatMessage {
  type: string;
  text: string;
}

function ChatBoot() {
  const [isChatbotVisible, setIsChatbotVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const apiUrl = 'http://localhost:8000/chatbot-api/chatbot/';

  const sendMessageToChatbot = async () => {
    if (!message.trim()) {
      setErrorMessage('Message cannot be empty');
      return;
    }

    // Add user message to chats
    setChats(chats => [...chats, { type: 'user', text: message }]);

    try {
      const response = await axios.post(apiUrl, { message });
      setChats(chats => [...chats, { type: 'bot', text: response.data.response }]);
      setMessage('');
      setErrorMessage('');
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      setChats(chats => [...chats, { type: 'bot', text: 'Error occurred while processing your message' }]);
    }
  };

  return (
    <div className="fixed right-12 bottom-20">
      <div className="relative">
        <button
          className={`absolute -right-6 -bottom-14 w-12 h-12 ${isChatbotVisible ? "animate-spin" : ""}`}
          onClick={() => setIsChatbotVisible(!isChatbotVisible)}
        >
          <img src={chatbootImg} alt="Chatbot" className="w-12 h-12" />
        </button>
        <div
          className={`w-72 h-auto bg-opacity-30 backdrop-blur-sm rounded bg-white rounded-tr-3xl rounded-bl-3xl ${isChatbotVisible ? "block" : "hidden"}`}
        >
          <div className="p-4 space-y-2 overflow-auto max-h-60 font-semibold">
            {chats.map((chat, index) => (
              <div key={index} className={`text-gray-800 ${chat.type === 'bot' ? "text-left text-white" : "text-right text-black"}`}>
                {chat.text}
              </div>
            ))}
          </div>
          {errorMessage && <div className="p-4 text-red-600">{errorMessage}</div>}
          <form className="p-4 flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); sendMessageToChatbot(); }}>
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-saffron"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoComplete="off"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessageToChatbot();
                }
              }}
            />
            <button
              type="submit"
              className="bg-saffron py-2 rounded-md text-white font-bold bg-opacity-80 hover:bg-opacity-100 mt-auto"
            >Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatBoot;
