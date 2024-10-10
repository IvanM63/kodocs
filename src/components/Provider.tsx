"use client";
import { ClientSideSuspense, LiveblocksProvider } from "@liveblocks/react";

import React from "react";
import Loader from "./Loader";
import { getAuthUser, getDocumentUsers } from "@/app/utils/actions/user.action";
import { useSession } from "next-auth/react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  //Get current user email
  const { data } = useSession();

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const users = await getAuthUser({ userIds });
        return users;
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const roomUsers = await getDocumentUsers({
          roomId,
          text,
          currentUser: data?.user.email || "",
        });
        return roomUsers;
      }}
    >
      <ClientSideSuspense fallback={<Loader></Loader>}>
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;
