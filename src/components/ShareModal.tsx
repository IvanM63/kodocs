"use client";
import React, { useState } from "react";
import MyButton from "./Button";
import { Share } from "iconsax-react";
import UserTypeSelector from "./UserTypeSelector";
import { ShareModalProps, User, UserType } from "@/types";
import Collaborator from "./Collaborator";
import { useSession } from "next-auth/react";
import { updateDocumentAccess } from "@/app/utils/actions/room.actions";

const ShareModal = ({ roomId, collaborators, creatorId }: ShareModalProps) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [userType, setUserType] = useState<UserType>("viewer");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  //Put Current User to object
  const currentUser: User = {
    email: String(session!.user.email),
    id: parseInt(String(session!.user.id)),
    image: String(session!.user.image),
    user: String(session!.user.name),
  };

  const shareDocumentHandler = async () => {
    setLoading(true);

    await updateDocumentAccess({
      roomId,
      email,
      userType: userType as UserType,
      updateBy: currentUser,
    });

    setLoading(false);
  };

  return (
    <div className="flex">
      <MyButton
        icon={<Share size="18" className="" />}
        name={window.innerWidth >= 768 ? "Share" : undefined}
        onClick={() => setOpen(!open)}
      />
      {open ? (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
          {/* Modal */}
          <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 pb-4">
                {/* <!-- Modal header --> */}
                <div className="flex items-center justify-between p-4 md:p-5 rounded-t">
                  <div className="flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Manage who can view this project
                    </h3>
                    <p className="text-sm text-gray-400">
                      Select which users can view and edit this document
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="default-modal"
                    onClick={() => setOpen(!open)}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* <!-- Modal body --> */}
                <div className="p-4 md:p-5 space-y-4">
                  <label htmlFor="email">Email Addresses</label>
                  <div className="flex flex-row space-x-2">
                    {/* Email Input */}
                    <div className="flex flex-row flex-1 bg-gray-100 py-2 px-4 rounded-md">
                      <input
                        className="flex-1 focus:outline-none placeholder:text-sm placeholder:font-light bg-gray-100"
                        type="text"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setEmail(e.target.value)
                        }
                        disabled={
                          loading || currentUser.id != parseInt(creatorId)
                        }
                      />
                      {/* User Type Selector */}
                      <UserTypeSelector
                        userType={userType}
                        setUserType={setUserType}
                      />
                    </div>
                    {/* Invite Button */}
                    <MyButton
                      name={loading ? "Sending.." : "Invite"}
                      disabled={
                        loading || currentUser.id != parseInt(creatorId)
                      }
                      onClick={shareDocumentHandler}
                    />
                  </div>
                </div>
                {/* <!-- Modal footer --> */}
                <div className="flex flex-col items-center p-4 md:p-5 space-y-4 border-gray-200 rounded-b ">
                  {collaborators.map((collaborator) => (
                    <Collaborator
                      key={collaborator.id}
                      roomId={roomId}
                      creatorId={creatorId}
                      email={collaborator.email}
                      collaborator={collaborator}
                      user={currentUser}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ShareModal;
