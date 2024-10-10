"use client";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {
  FloatingComposer,
  FloatingThreads,
  liveblocksConfig,
  LiveblocksPlugin,
  useEditorStatus,
} from "@liveblocks/react-lexical";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode } from "@lexical/rich-text";

import ExampleTheme from "./ExampleTheme";

// import TreeViewPlugin from "./plugins/TreeViewPlugin";
import ToolbarPlugin from "./ToolbarPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { ListNode, ListItemNode } from "@lexical/list";

import Loader from "../Loader";
import FloatingCommentPlugin from "./FloatingCommentPlugin";
import { useThreads } from "@liveblocks/react/suspense";
import Comments from "../Comments";
import { UserType } from "@/types";
import DeleteModal from "../DeleteModal";

const placeholder = "Enter some rich text...";

export default function Editor({
  roomId,
  currentUserType,
  canDeleteDoc,
}: {
  roomId: string;
  currentUserType: UserType;
  canDeleteDoc: boolean;
}) {
  const status = useEditorStatus();
  const { threads } = useThreads();

  const editorConfig = liveblocksConfig({
    namespace: "React.js Demo",
    nodes: [HeadingNode, ListNode, ListItemNode],
    // Handling of errors during update
    onError(error: Error) {
      throw error;
    },
    // The editor theme
    theme: ExampleTheme,
    editable: currentUserType === "editor",
  });
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container flex-col flex w-full ">
        <div className="flex flex-row border-t-[1px] border-b-[1px] border-black justify-between overflow-x-auto whitespace-nowrap will-change-scroll">
          <ToolbarPlugin />
          {canDeleteDoc && <DeleteModal roomId={roomId} />}
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-center overflow-auto justify-center mt-10 md:space-x-6 w-full mb-2 px-1 md:px-0 ">
          {status === "not-loaded" || status === "loading" ? (
            <Loader />
          ) : (
            <div className=" editor-inner relative w-full min-h-[1100px] h-fit mb-5 max-w-[800px] shadow-md rounded-md">
              <RichTextPlugin
                contentEditable={
                  <ContentEditable
                    className="editor-input h-full rounded-md"
                    aria-placeholder={placeholder}
                  />
                }
                ErrorBoundary={LexicalErrorBoundary}
                placeholder={null}
              />
              {currentUserType === "editor" && <FloatingCommentPlugin />}
              <HistoryPlugin />
              <AutoFocusPlugin />
              <ListPlugin />
              {/* <TreeViewPlugin /> */}
            </div>
          )}
          <LiveblocksPlugin>
            <FloatingComposer />
            <FloatingThreads threads={threads} />
            <Comments />
          </LiveblocksPlugin>
        </div>
      </div>
    </LexicalComposer>
  );
}
