"use client";
import { createDocument } from "@/app/utils/actions/room.actions";
import { Add } from "iconsax-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddDocumentHandler = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const addDocumentHandler = async () => {
    try {
      setLoading(true);
      const room = await createDocument({
        userId: String(session?.user.id),
        email: session?.user.email ?? "",
      });
      if (room) router.push(`/documents/${room.id}`);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={addDocumentHandler}
      className={`flex flex-row space-x-1 bg-primary text-white rounded-md items-center px-4 py-1 justify-center
 active:bg-persian-blue-900 outline outline-2 outline-persian-blue-200 disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed`}
    >
      <Add size="24" className="" />
      <p className="md:flex hidden text-sm ">Start a Blank Document</p>
    </button>
  );
};

export default AddDocumentHandler;
