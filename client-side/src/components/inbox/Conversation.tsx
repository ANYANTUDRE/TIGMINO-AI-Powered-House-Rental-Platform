import React from "react";
import { ConversationType } from ".";
import { useNavigate} from "react-router-dom";
import { UserIcon } from "@heroicons/react/solid";


interface ConversationProps {
  conversation: ConversationType;
  userId: string;
}

const Conversation: React.FC<ConversationProps> = ({
  conversation,
  userId
}) => {
  const navigate = useNavigate();
  const otherUser = conversation.users.find((user) => user.id != userId)

  return (
    <div className="bg-white px-6 py-4 gap-6 flex flex-col justify-between cursor-pointer border border-terracotta shadow-lg rounded-xl basis-[45%]">
    <div className="flex justify-between items-center py-2">
        <p className="text-xl text-black font-semibold">{otherUser?.name}</p>
        <div className="w-10 h-10 rounded-full overflow-hidden bg-terracotta">
          {otherUser?.avatar_url? (
            <img src={otherUser?.avatar_url} alt={`${otherUser?.name} profile image`} className="w-full h-full object-cover" />
          ) : (
            <UserIcon className="text-black" />
          )}
        </div>
    </div>

    <p onClick={() => navigate(`/api/chat/${conversation.id}`)} className="text-white py-2 px-4 rounded-lg text-center font-semibold bg-saffron">
        Go to conversation
    </p>
</div>

  )
}

export default Conversation;