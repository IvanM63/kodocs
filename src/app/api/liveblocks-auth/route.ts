import { prisma } from "@/app/utils/db";
import { liveblocks } from "@/app/utils/liveblocks";
import { authOptions } from "@/app/utils/nextauth";
import { getUserColor } from "@/app/utils/utils";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: Request) {
  //Get current session user
  const session = await getServerSession(authOptions);
  //if no user then redirect to sign in page
  if (!session) redirect("/sign-in");

  const fetchUser = async () => {
    try {
      const userResult = await prisma.user.findUnique({
        where: {
          id: session!.user.id,
        },
      });

      return userResult;
    } catch (error) {
      console.log(error);
    }
  };

  // Get the current user from your database
  const authUser = await fetchUser();

  const user = {
    id: authUser!.id,
    info: {
      id: String(authUser!.id),
      name: authUser!.username,
      email: authUser!.email,
      avatar: authUser!.image,
      color: getUserColor(String(authUser!.id)),
    },
  };

  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.info.email,
      groupIds: [], // Optional
    },
    { userInfo: user.info }
  );

  return new Response(body, { status });
}
