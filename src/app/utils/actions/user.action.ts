"use server";

import { liveblocks } from "../liveblocks";

export const getAuthUser = async ({ userIds }: { userIds: string[] }) => {
  try {
    const response = await fetch(process.env.URL + `/api/users`, {
      method: "POST",
      body: JSON.stringify({
        emails: userIds,
      }),
    });
    const usersResult = await response.json();

    const users = usersResult.map(
      (user: {
        id: string;
        username: string;
        email: string;
        image: string;
      }) => ({
        id: String(user.id),
        name: user.username,
        email: user.email,
        avatar: user.image,
      })
    );
    const sortedUsers = userIds.map((email) =>
      users.find(
        (user: {
          id: string;
          username: string;
          email: string;
          image: string;
        }) => user.email === email
      )
    );
    return JSON.parse(JSON.stringify(sortedUsers));
  } catch (error) {
    console.log(error);
  }
};

export const getDocumentUsers = async ({
  text,
  roomId,
  currentUser,
}: {
  text: string;
  roomId: string;
  currentUser: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const users = Object.keys(room.usersAccesses).filter(
      (email) => email != currentUser
    );

    if (text.length) {
      const lowerCase = text.toLowerCase();

      const filteredUser = users.filter((email) =>
        email.toLowerCase().includes(lowerCase)
      );
      return JSON.parse(JSON.stringify(filteredUser));
    }
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
};
