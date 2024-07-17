import { getUserId } from "../../lib/actions";
import apiService from "../../services/apiService";
import React, { useState, useEffect } from 'react';
import Conversation from "./Conversation";
import H1Title from "../../Shared/H1Title";
import LoadingSpinner from "../../Shared/LoadingSpinner";

export type UserType = {
  id: string;
  name: string;
  avatar_url: string;
}

export type ConversationType = {
  id: string;
  users: UserType[];
}

const InboxPage = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
      const fetchData = async () => {
          const id = await getUserId();
          console.log("id -->", id)
          if (id) {
              setUserId(id);
              const convos = await apiService.get('/api/chat/');
              setConversations(convos);
              setLoading(false);
          }
      };
      fetchData();
  }, []);

  if (loading) {
      return <LoadingSpinner />;
  }

  return (
    <section className="mx-auto min-h-screen bg-beige-primary-bg flex justify-center pt-4">
      <div className="w-[86%]">
        <H1Title styling="text-terracotta">Inbox</H1Title>
        <div className="py-8 flex gap-4 ">
          {conversations.map((conversation: ConversationType) => {
            return (
              <Conversation 
                userId={userId!}
                key={conversation.id}
                conversation={conversation}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default InboxPage;
