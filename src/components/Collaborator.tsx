"use client";
import { CollaboratorProps, UserType } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import UserTypeSelector from "./UserTypeSelector";
import MyButton from "./Button";
import {
  removeCollaborator,
  updateDocumentAccess,
} from "@/app/utils/actions/room.actions";

const Collaborator = ({
  collaborator,
  creatorId,
  email,
  roomId,
  user,
}: CollaboratorProps) => {
  const [userType, setUserType] = useState<UserType>(
    collaborator.userType || "viewer"
  );
  const [loading, setLoading] = useState(false);

  const shareCollaboratorHandler = async (type: string) => {
    setLoading(true);
    console.log(user);

    await updateDocumentAccess({
      roomId,
      email,
      userType: type as UserType,
      updateBy: user,
    });

    setLoading(false);
  };
  const removeCollaboratorHandler = async (email: string) => {
    setLoading(true);

    await removeCollaborator({ email, roomId });

    setLoading(false);
  };

  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-row justify-between w-full space-x-2">
        <Image
          alt="colab-avatar"
          src={collaborator.image}
          width={44}
          height={44}
          className="rounded-full flex"
        />
        <div className="flex flex-1 flex-col">
          <p>
            {collaborator.username}
            <span className="mx-4 text-sm text-blue-300">
              {loading && "updating..."}
            </span>
          </p>
          <p className="text-sm text-gray-400">{collaborator.email}</p>
        </div>
        <div className="flex justify-center items-center">
          {String(collaborator.id) === creatorId ? (
            <p className="text-center">Owner</p>
          ) : creatorId !== String(user.id) ? null : (
            <div className="flex flex-row space-x-2">
              <UserTypeSelector
                userType={userType}
                setUserType={setUserType}
                onClickHandler={shareCollaboratorHandler}
              />
              <MyButton
                className="bg-red-500 active:bg-red-700 outline-red-400"
                name="remove"
                onClick={() => removeCollaboratorHandler(collaborator.email)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collaborator;
