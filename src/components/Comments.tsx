import { ThreadWrapperProps } from "@/types";
import { useIsThreadActive } from "@liveblocks/react-lexical";
import { Composer, Thread } from "@liveblocks/react-ui";
import { useThreads } from "@liveblocks/react/suspense";
import React from "react";

const ThreadsWrapper = ({ thread }: ThreadWrapperProps) => {
  const isActive = useIsThreadActive(thread.id);
  return (
    <Thread
      thread={thread}
      data-state={isActive ? "active" : null}
      className={`border rounded-sm w-full max-w-[800px] transition-all lg:w-[350px] ${
        isActive && "!border-blue-500 shadow-md"
      } ${thread.resolved && "opacity-40"}`}
    />
  );
};

const Comments = () => {
  const { threads } = useThreads();
  return (
    <div className="flex flex-col h-full w-full  space-y-4 items-center justify-center lg:max-w-[350px]">
      <Composer className="rounded-md w-full max-w-[800px]" />
      {threads.map((thread) => (
        <ThreadsWrapper key={thread.id} thread={thread} />
      ))}
    </div>
  );
};

export default Comments;
