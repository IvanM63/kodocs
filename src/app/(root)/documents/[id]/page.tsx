import { getDocument } from "@/app/utils/actions/room.actions";
import { authOptions } from "@/app/utils/nextauth";
import RoomCollaborative from "@/components/RoomCollaborative";
import { User } from "@/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Document = async ({ params: { id } }: SearchParamProps) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  const room = await getDocument({
    roomId: id,
    userId: String(session!.user.email),
  });
  if (!room) redirect("/");

  const userIds = Object.keys(room.usersAccesses);

  const fetchAssociatedUsers = async () => {
    try {
      const response = await fetch(process.env.URL + `/api/users`, {
        method: "POST",
        body: JSON.stringify({ emails: userIds }),
      });
      const userResult = await response.json();
      return userResult;
    } catch (error) {
      console.log(error);
    }
  };

  const users = await fetchAssociatedUsers();

  const usersData = users.map((user: User) => ({
    ...user,
    userType: room.usersAccesses[user.email]?.includes("room:write")
      ? "editor"
      : "viewer",
  }));

  const currentUserType =
    session?.user?.email &&
    room.usersAccesses[session.user.email]?.includes("room:write")
      ? "editor"
      : "viewer";

  return (
    <div>
      <RoomCollaborative
        roomId={id}
        roomMetaData={room.metadata}
        users={usersData}
        currentUserType={currentUserType}
      />
    </div>
  );
};

export default Document;
