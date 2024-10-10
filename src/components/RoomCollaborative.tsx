"use client";
import Editor from "@/components/editors/Editor";
import Header from "@/components/navigation/header";
import { Edit } from "iconsax-react";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react";
import React, { useEffect, useRef, useState } from "react";
import ActiveCollaborators from "./ActiveCollaborators";
import Loader from "./Loader";
import { updateDocument } from "@/app/utils/actions/room.actions";
import { RoomCollaborativeProps, User } from "@/types";
import ShareModal from "./ShareModal";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import MyButton from "./Button";

import UserAvatar from "./UserAvatar";

const RoomCollaborative = ({
  roomId,
  roomMetaData,
  users,
  currentUserType,
}: RoomCollaborativeProps) => {
  const router = useRouter();
  const { data } = useSession();
  const [editing, setEditing] = useState(false);
  const [documentTitle, setDocumentTitle] = useState(roomMetaData.title);
  const [loading, setLoading] = useState(false);

  //Put Current User to object
  const currentUser: User = {
    email: String(data!.user.email),
    id: parseInt(String(data!.user.id)),
    image: String(data!.user.image),
    user: String(data!.user.name),
  };

  //Used for handle mouse pointer outside input div
  const containerRef = useRef<HTMLDivElement>(null);
  //Used for
  const inputRef = useRef<HTMLInputElement>(null);

  const updateTitleHandler = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key == "Enter") {
      setLoading(true);
      try {
        if (documentTitle !== roomMetaData.title) {
          const updatedDocument = await updateDocument(roomId, documentTitle);
          if (updatedDocument) setEditing(false);
        }
      } catch (error) {
        console.log("There is error in changing Title: ", error);
      }
      setLoading(false);
    }
  };

  // If user click outside input div, then it will saving / editing set to false
  useEffect(() => {
    const handleMouseOut = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setEditing(false);
        updateDocument(roomId, documentTitle);
      }
    };

    document.addEventListener("mousedown", handleMouseOut);
    return () => {
      document.removeEventListener("mousedown", handleMouseOut);
    };
  }, [documentTitle, roomId]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div>
          <Header>
            <div
              ref={containerRef}
              className="flex flex-1 space-x-2 justify-center"
            >
              {editing && !loading ? (
                <input
                  type="text"
                  className="font-bold text-lg bg-transparent focus:outline-none text-center"
                  placeholder="Untitled"
                  disabled={!editing}
                  ref={inputRef}
                  value={documentTitle}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setDocumentTitle(e.target.value)
                  }
                  onKeyDown={updateTitleHandler}
                />
              ) : (
                <p className="font-bold text-base md:text-lg">
                  {documentTitle}
                </p>
              )}

              {currentUserType === "editor" && !editing && (
                <Edit
                  onClick={() => setEditing(true)}
                  size={window.innerWidth >= 768 ? "24px" : "16px"}
                  className="text-text "
                />
              )}
              {currentUserType !== "editor" && !editing && (
                <p className="bg-blue-500 text-white rounded-full p-1.5 text-xs text-center">
                  View Only
                </p>
              )}

              {loading && (
                <p className="bg-blue-500 text-white rounded-full p-1.5 text-xs text-center">
                  saving...
                </p>
              )}
            </div>
            <div className="mx-1 relative right-0">
              <ActiveCollaborators />
            </div>

            {data?.user ? (
              // IF USER AUTHENTICATED OR EXIST IN SESSION
              <div className="flex flex-row space-x-3 h-full">
                {/* Share Button */}
                <ShareModal
                  roomId={roomId}
                  collaborators={users}
                  creatorId={roomMetaData.creatorId}
                  currentUserTpe={currentUserType}
                />
                {/* Avatar */}
                <UserAvatar user={currentUser} />
              </div>
            ) : (
              // IF USER NOT AUTHENTICATED OR EXIST IN SESSION
              <div className="flex flex-row h-full">
                {/* Button */}
                <MyButton
                  className="h-9"
                  name="Login"
                  onClick={() => router.push("/sign-in")}
                />
              </div>
            )}
          </Header>
          <Editor
            roomId={roomId}
            currentUserType={currentUserType}
            canDeleteDoc={
              String(roomMetaData.creatorId) === String(currentUser.id)
            }
          />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default RoomCollaborative;
