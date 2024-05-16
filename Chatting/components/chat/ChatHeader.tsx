"use client";

import React, { useState } from "react";
import { Hash } from "lucide-react";
import MobileToggle from "../MobileToggle";
import UserAvatar from "../UserAvatar";
import SocketIndicator from "../SocketIndicator";
import ChatVideoBtn from "./ChatVideoBtn";
import { Button } from "../ui/button";
import JoinRoom from "../modals/CreateAndJoinRoom";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  serverId,
  name,
  type,
  imageUrl,
}) => {
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);

  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="mx-2 w-4 h-4 text-zinc-500 dark:text-zinc-400" />
      )}
      {type === "conversation" && (
        <UserAvatar
          src={imageUrl}
          className="mr-2 h-8 w-8 md:h-8 md:w-8 object-cover"
        />
      )}
      <p className="font-semibold text-md text-black dark:text-white">{name}</p>
      <div className="ml-auto flex items-center">
        <div className="m-auto my-auto rounded p-3">
          <Button
            className=""
            size={"sm"}
            variant={"secondary"}
            onClick={() => setIsCreateRoomOpen(open=>!open)} // Open Create Room popup
          >
            Create Room
          </Button>
          {isCreateRoomOpen && <JoinRoom />} {/* Show CreateRoom if isOpen */}
        </div>
        {type === "conversation" && <ChatVideoBtn />}
        <SocketIndicator />
      </div>
    </div>
  );
};

export default ChatHeader;
