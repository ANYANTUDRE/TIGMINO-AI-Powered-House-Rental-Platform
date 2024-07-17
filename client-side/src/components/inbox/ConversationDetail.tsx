import React, { useEffect, useState, useRef } from "react";
import CustomButton from "../form/CustomButton";
import useWebSocket from "react-use-websocket";
import { ConversationType } from "./index";
import { MessageType } from "./page";

interface ConversationDetailProps {
    token: string;
    userId: string;
    conversation: ConversationType;
    messages: MessageType[];
}

interface WebSocketMessage {
    name: string;
    body: string;
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({
    userId,
    token,
    messages,
    conversation
}) => {
    const messagesDiv = useRef<HTMLDivElement>(null);
    const [newMessage, setNewMessage] = useState('');
    const [realtimeMessages, setRealtimeMessages] = useState<MessageType[]>([]);
    const myUser = conversation.users.find((user) => user.id === userId);
    const otherUser = conversation.users.find((user) => user.id !== userId);

    const { sendJsonMessage, lastJsonMessage } = useWebSocket<WebSocketMessage>(
        `ws://127.0.0.1:8000/ws/${conversation.id}/?token=${token}`, 
        { share: false, shouldReconnect: () => true }
    );

    useEffect(() => {
        if (lastJsonMessage) {
            const message: MessageType = {
                id: '',
                name: lastJsonMessage.name,
                body: lastJsonMessage.body,
                sent_to: otherUser!,
                created_by: myUser!,
                conversationId: conversation.id
            };
            setRealtimeMessages((prevMessages) => [...prevMessages, message]);
            scrollToBottom();
        }
    }, [lastJsonMessage]);

    const sendMessage = () => {
        sendJsonMessage({
            event: 'chat_message',
            data: {
                body: newMessage,
                name: myUser?.name,
                sent_to_id: otherUser?.id,
                conversation_id: conversation.id
            }
        });
        setNewMessage('');
    };

    const scrollToBottom = () => {
        if (messagesDiv.current) {
            messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
        }
    };

    return (
        <section className="bg-beige-primary-bg flex justify-center min-h-screen w-full">
            <div className="h-full w-[86%]">
                <div ref={messagesDiv} className="overflow-auto space-y-4 p-6">
                    {[...messages, ...realtimeMessages].map((message, index) => (
                        <div
                            key={index}
                            className={`flex items-end ${
                                message.created_by.id === userId ? 'justify-end' : 'justify-start'
                            }`}
                        >
                            {message.created_by.id !== userId && (
                                <img src={message.created_by.avatar_url} alt="avatar" className="w-10 h-10 rounded-full mr-2" />
                            )}
                            <div
                                className={`max-w-xs p-4 rounded-lg ${
                                    message.created_by.id === userId ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                                }`}
                            >
                                <p>{message.body}</p>
                            </div>
                            {message.created_by.id === userId && (
                                <img src={message.created_by.avatar_url} alt="avatar" className="w-10 h-10 rounded-full ml-2" />
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex items-center p-4 border-t border-gray-300">
                    <input
                        type="text"
                        placeholder="Write a message..."
                        className="flex-grow p-2 border border-gray-300 rounded-lg outline-saffron"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <CustomButton 
                        label="Send"
                        onClick={sendMessage}
                        className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
                    />
                </div>
            </div>
        </section>
    );
}

export default ConversationDetail;
