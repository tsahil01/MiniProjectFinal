"use client";
import React, { use, useEffect, useState } from "react";
import {
  LiveKitRoom,
  VideoConference,
} from "@livekit/components-react";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

import '@livekit/components-styles';

interface CodeRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
}

const CodeRoom: React.FC<CodeRoomProps> = ({ chatId, video, audio }) => {
  const { user } = useUser();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!user?.firstName || !user?.lastName) return;
    const name = `${user.firstName} ${user.lastName}`;

    (async () => {
      try {
        const resp = await fetch(
          `/api/livekit?room=${chatId}&username=${name}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user?.firstName, user?.lastName, chatId]);

  if (token === "") {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 size={64} />
      </div>
    );
  }
  return (
    <div className="h-full flex flex-row overflow-hidden">
    <LiveKitRoom
      className="flex flex-col"
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect={true}
      video={video}
      audio={audio}
      >
      <VideoConference />
    </LiveKitRoom>
      </div>
  );
};

export default CodeRoom;
