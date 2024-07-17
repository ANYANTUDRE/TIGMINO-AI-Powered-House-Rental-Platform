import React from 'react';
import apiService from "../../services/apiService";
import { useNavigate } from "react-router-dom";

interface ContactButtonProps {
    userId: string | null;
    landlordId: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({
    userId,
    landlordId
}) => {
    const navigate = useNavigate();

    const startConversation = async () => {
        if (userId) {
            try {
                const conversation = await apiService.get(`/api/chat/start/${landlordId}/`);

                if (conversation && conversation.conversation_id) {
                    navigate(`/api/chat/${conversation.conversation_id}`);
                }
            } catch (error) {
                console.error('Error starting conversation:', error);
            }
        } else {
            navigate("signin");
        }
    }

    return (
        <div 
            onClick={startConversation}
            className="text-center mt-10 bg-gradient-to-r from-coral to-indigo hover:bg-gradient-to-r hover:from-indigo hover:to-coral duration-500 px-2 py-4 rounded-md text-white font-bold cursor-pointer">
            Contact Host
        </div>
    );
}

export default ContactButton;
