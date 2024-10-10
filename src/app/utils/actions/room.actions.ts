"use server";
import { nanoid } from "nanoid";
import { liveblocks } from "../liveblocks";

import { revalidatePath } from "next/cache";
import { AccessType, RoomAccesses, ShareDocumentParams } from "@/types";
import { getAccessType } from "../utils";
import { redirect } from "next/navigation";

type CreateDocumentParams = {
  userId: string;
  email: string;
};

export const createDocument = async ({
  userId,
  email,
}: CreateDocumentParams) => {
  const roomId = nanoid();

  try {
    const metadata = {
      creatorId: userId,
      email,
      title: "untitled",
    };

    const usersAccesses: RoomAccesses = {
      [email]: ["room:write"],
    };

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: ["room:write"],
    });

    revalidatePath("/");
    return JSON.parse(JSON.stringify(room));
  } catch (error) {
    console.log(`Error when creating room ${error}`);
  }
};

export const getDocument = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const hasAccess = Object.keys(room.usersAccesses).includes(userId);

    if (!hasAccess) throw new Error("You do not have access to this document");

    return JSON.parse(JSON.stringify(room));
  } catch (error) {
    console.log(`Error happening when getting room: ${error}`);
  }
};

export const getDocuments = async (email: string) => {
  try {
    const room = await liveblocks.getRooms({ userId: email });

    //const hasAccess = Object.keys(room.usersAccesses).includes(userId);
    //console.log(hasAccess);
    //console.log(room);

    //if (!hasAccess) throw new Error("You do not have access to this document");
    return JSON.parse(JSON.stringify(room));
  } catch (error) {
    console.log(`Error happening when getting room: ${error}`);
  }
};

export const updateDocument = async (roomId: string, title: string) => {
  try {
    const updatedRoom = await liveblocks.updateRoom(roomId, {
      metadata: { title },
    });
    revalidatePath(`/document/${roomId}`);
    return JSON.parse(JSON.stringify(updatedRoom));
  } catch (error) {
    console.log("Error when updating room:", error);
  }
};

export const updateDocumentAccess = async ({
  roomId,
  email,
  userType,
  updateBy,
}: ShareDocumentParams) => {
  try {
    //Check if there are email in database
    const result = await fetch(process.env.URL + `/api/users/${email}`, {
      method: "GET",
    });
    if (!result.ok) {
      throw new Error("There are no such user in database");
    }

    const usersAccesses: RoomAccesses = {
      [email]: getAccessType(userType) as AccessType,
    };

    //Check if already email in database

    const room = await liveblocks.updateRoom(roomId, { usersAccesses });
    console.log(updateBy);

    if (room) {
      const notificationId = nanoid();

      await liveblocks.triggerInboxNotification({
        userId: email,
        kind: `$documentAccess`,
        subjectId: notificationId,
        activityData: {
          userType,
          title: `You have been granted ${userType} access to the document by ${updateBy.user}`,
          updateBy: updateBy.user,
          avatar: updateBy.image,
          email: updateBy.email,
        },
        roomId,
      });
    }

    revalidatePath(`/documents/${roomId}`);

    return JSON.parse(JSON.stringify(room));
  } catch (error) {
    console.log(error);
  }
};

export const removeCollaborator = async ({
  roomId,
  email,
}: {
  roomId: string;
  email: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    if (room.metadata.email === email) {
      throw new Error("You cannot remove your self");
    }

    const updatedRoom = await liveblocks.updateRoom(roomId, {
      usersAccesses: {
        [email]: null,
      },
    });

    revalidatePath(`/documents/${roomId}`);
    return JSON.parse(JSON.stringify(updatedRoom));
  } catch (error) {
    console.log(error);
  }
};

export const deleteDocument = async (roomId: string) => {
  try {
    await liveblocks.deleteRoom(roomId);
    revalidatePath(`/documents/${roomId}`);
    redirect("/");
  } catch (error) {
    console.log(error);
  }
};
