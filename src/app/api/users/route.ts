import { prisma } from "@/app/utils/db";

export const POST = async (request: Request) => {
  const { ids, emails } = await request.json();
  //if there is no ids or the ids is not arra,  then out
  if (!ids && !emails)
    return new Response(
      JSON.stringify({ message: "Atleast one field must be filled!" }),
      { status: 400 }
    );

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any[] = [];
    //if there are only ids
    if (ids) {
      result = await prisma.user.findMany({
        where: {
          id: {
            in: ids.map((id: string) => parseInt(id)),
          },
        },
      });
    }
    //if there are only emails
    if (emails) {
      result = await prisma.user.findMany({
        where: {
          email: {
            in: emails,
          },
        },
      });
    }
    if (result?.length < 1)
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 400 });
  }
};
