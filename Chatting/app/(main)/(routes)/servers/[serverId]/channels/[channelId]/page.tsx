import { currentProfile } from "@/lib/currentProfile";
import { redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";
import React from "react";
import { redirect } from "next/navigation";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import CodeInput from "@/components/chat/CodeInput";
import ChatMessages from "@/components/chat/ChatMessages";
import { ChannelType } from "@prisma/client";
import MediaRoom from "@/components/MediaRoom";
import CodeRoom from "@/components/CodeRoom";

interface PageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();
  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });
  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });
  if (!channel || !member) {
    redirect("/");
  }
  return (
    <div className="bg-[#F4F6F8]  dark:bg-[#0f1117] flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessages
            member={member}
            name={channel.name}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
            paramKey="channelId"
            chatId={channel.id}
            paramValue={channel.id}
          />
          <ChatInput
            name={channel.name}
            type="channel"
            apiUrl="/api/socket/messages"
            query={{ serverId: channel.serverId, channelId: channel.id }}
          />
        </>
      )}
      {channel.type === ChannelType.AUDIO && (
        <MediaRoom chatId={channel.id} video={false} audio={true} />
      )}
      {channel.type === ChannelType.VIDEO && (
        <MediaRoom chatId={channel.id} video={true} audio={true} />
      )}
      {channel.type === ChannelType.CODE && (
        <>
          <div className="flex-1 flex flex-col py-4">
            <CodeInput
              name={channel.name}
              type="channel"
              apiUrl="/api/socket/messages"
              query={{ serverId: channel.serverId, channelId: channel.id }}
            />
          </div>
          <CodeRoom chatId={channel.id} video={true} audio={true} />
        </>
      )}
    </div>
  );
};

export default Page;
