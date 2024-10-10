import { prisma } from "@/app/utils/db";

export const GET = async (
  _request: Request,
  { params }: { params: { param: string } }
) => {
  //Check if param is email
  if (typeof params.param === "string" && params.param.includes("@")) {
    try {
      //catch from database
      const user = await prisma.user.findFirst({
        where: {
          email: params.param,
        },
      });
      //If user not found in database, the return error
      if (!user)
        return new Response(JSON.stringify({ error: "User not found" }), {
          status: 404,
        });
      //If user found then return it
      return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
      return new Response(
        JSON.stringify({ message: "THere is error catching user: ", error }),
        { status: 400 }
      );
    }
  }
  //Check if params is userId
  else if (/\d+/.test(params.param as string)) {
    try {
      //catch from database
      const userResult = await prisma.user.findUnique({
        where: {
          id: parseInt(params.param),
        },
      });
      //If user not found in database, the return error
      if (!userResult)
        return new Response(JSON.stringify({ error: "User not found" }), {
          status: 404,
        });
      //If user found then return it
      return new Response(JSON.stringify(userResult));
    } catch (error) {
      return new Response(JSON.stringify(error), { status: 500 });
    }
  }
};
