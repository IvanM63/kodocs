"use client";
import { Trash } from "iconsax-react";
import React, { useState } from "react";
import MyButton from "./Button";
import { deleteDocument } from "@/app/utils/actions/room.actions";

const DeleteModal = ({ roomId }: { roomId: string }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent the link navigation
    event.preventDefault();
    event.stopPropagation();
    setOpen(!open);
  };

  const deleteDocumentHandler = async () => {
    setLoading(true);
    try {
      await deleteDocument(roomId);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex p-2">
      <MyButton
        className="bg-transparent outline-none outline-0 active:bg-red-100 hover:bg-red-50"
        onClick={handleButtonClick}
        icon={<Trash size="24" className="text-red-500 text-center" />}
      />

      {open ? (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
          {/* Modal */}
          <div
            onClick={handleModalClick}
            className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 pb-4">
                {/* <!-- Modal header --> */}
                <div className="flex items-center justify-between p-4 md:p-5 md:pb-1 rounded-t">
                  <div className="flex flex-col bg-red-100 p-3 rounded-full">
                    <Trash size="24" className="text-red-500" />
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
                <div className="p-4 md:p-5 space-y-1">
                  <label htmlFor="delete">Delete Document</label>
                  <p className="text-sm text-gray-400">
                    Are you sure want to delete this document? There is no
                    holdin back
                  </p>
                </div>
                {/* <!-- Modal footer --> */}
                <div className="flex flex-col items-center p-4 md:p-5 space-y-4 border-gray-200 rounded-b ">
                  <MyButton
                    className="bg-red-500 outline-none outline-0 active:bg-red-100 w-full py-2"
                    onClick={deleteDocumentHandler}
                    name={loading ? "Deleting..." : "Delete"}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default DeleteModal;
