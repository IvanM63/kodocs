"use client";
import { timeAgo } from "@/app/utils/utils";
import Image from "next/image";
import React from "react";
import DeleteModal from "./DeleteModal";

interface DocumentCardInterface {
  name: string;
  date: string;
  roomId: string;
  currentUserEmail: string;
  documentUserEmail: string;
}

const DocumentCard: React.FC<DocumentCardInterface> = (props) => {
  return (
    <div className="bg-gray-nurse-50 w-full flex flex-row justify-between p-5 space-x-4 rounded-lg shadow-lg">
      {/* ICON SECTION */}
      <div className="flex w-14 h-14 items-center justify-center bg-gray-nurse-100 rounded-lg">
        <Image alt="docs" src="/icons/docs.svg" width={40} height={40} />
      </div>
      {/* INFO SECTION */}
      <div className="flex-1 flex flex-col justify-center space-y-1">
        <h2 className="flex font-bold">{props.name}</h2>
        <p className="flex text-sm">{timeAgo(props.date)}</p>
      </div>
      {/* TRASH BUTTON */}
      {props.currentUserEmail === props.documentUserEmail ? (
        <DeleteModal roomId={props.roomId} />
      ) : null}
    </div>
  );
};

export default DocumentCard;
