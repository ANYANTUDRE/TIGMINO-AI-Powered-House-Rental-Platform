import { getUserId, getAccessToken } from "../../lib/actions";
import React, {useState, useEffect } from 'react';
import apiService from "../../services/apiService";
import ConversationDetail from "../../components/inbox/ConversationDetail";
import { ConversationType, UserType } from "./index";
import { useParams } from "react-router-dom"; // Import useParams hook
import LoadingSpinner from "../../Shared/LoadingSpinner";

export type MessageType = {
    id: string;
    name: string;
    body: string;
    conversationId: string;
    sent_to: UserType;
    created_by: UserType;
}

const ConversationPage = () => {
    const { id } = useParams(); // Get the id parameter using useParams hook
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [conversation, setConversation] = useState<{ messages: MessageType[], conversation: ConversationType } | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            const userId = await getUserId();
            const accessToken = await getAccessToken();
            if (userId && accessToken) {
                setUserId(userId);
                setToken(accessToken);
                const convoData = await apiService.get(`/api/chat/${id}/`);
                setConversation(convoData);
                setLoading(false);
            } else {
                return (
                    <main className="max-w-[1500px] max-auto px-6 py-12">
                        <p>You need to be authenticated...</p>
                    </main>
                )
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <main className="max-w-[1500px] mx-auto">
            <ConversationDetail 
                token={token!}
                userId={userId!}
                messages={conversation!.messages}
                conversation={conversation!.conversation}
            />
        </main>
    );
}

export default ConversationPage;
