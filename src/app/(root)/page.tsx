import AddDocumentHandler from "@/components/AddDocumentBtn";

import DocumentCard from "@/components/DocumentCard";
import Header from "@/components/navigation/header";

import React from "react";

import { getDocuments } from "../utils/actions/room.actions";

import { authOptions } from "@/app/utils/nextauth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Doc, User } from "@/types";
import MyButton from "@/components/Button";
import UserAvatar from "@/components/UserAvatar";
import Notification from "@/components/Notification";

const Home = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/sign-in");

  //Put current user to const
  const currentUser: User = {
    email: String(session.user.email),
    id: parseInt(String(session.user.id)),
    image: String(session.user.image),
    user: String(session.user.name),
  };

  const documents = await getDocuments(String(session!.user.email));

  return (
    <main className="flex flex-col">
      <Header>
        {session?.user ? (
          // IF USER AUTHENTICATED OR EXIST IN SESSION
          <div className="flex flex-row space-x-3 h-full">
            <Notification />
            <UserAvatar user={currentUser} />
          </div>
        ) : (
          // IF USER NOT AUTHENTICATED OR EXIST IN SESSION
          <div className="flex flex-row h-full">
            {/* Button */}
            <Link href={"/sign-in"}>
              <MyButton className="h-9" name="Login" />
            </Link>
          </div>
        )}
      </Header>
      <div className="flex flex-col w-full lg:w-3/6 h-screen self-center space-y-10 py-2 px-4 md:p-2">
        {/* TOPROW */}
        <div className="flex flex-row justify-between ">
          <h1 className="flex font-bold">All Documents</h1>
          <AddDocumentHandler />
        </div>
        {/* BOTTOM ROW */}
        {documents.data.length > 0 ? (
          <div className="flex flex-col space-y-6">
            {documents.data.map((document: Doc) => (
              <Link key={document.id} href={`/documents/${document.id}`}>
                <DocumentCard
                  name={document.metadata.title}
                  date={document.createdAt}
                  roomId={document.id}
                  currentUserEmail={currentUser.email}
                  documentUserEmail={document.metadata.email}
                />
              </Link>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
};

export default Home;
