import { prisma } from "@/app/utils/db";
import { DefaultSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: number;
    };
  }
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Contoh redirect ke halaman lain setelah login
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`; // Arahkan ke halaman dalam situs
      } else if (url.startsWith("https://")) {
        return url; // Arahkan ke URL eksternal
      }
      return baseUrl; // Arahkan ke halaman default (baseUrl)
    },
    async session({ session }) {
      try {
        const result = await prisma.user.findFirst({
          where: {
            email: session.user?.email ?? undefined,
          },
        });

        if (result) {
          session.user!.id = result!.id;
        }
        //console.log(session);
      } catch (error) {
        console.error("Error fetching user during session callback", error);
      }
      return session;
    },
    async signIn({ profile }) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      if (!profile?.email || !profile?.name || !profile?.picture)
        throw new Error("No Profile");

      try {
        //If user already in database
        const userExist = await prisma.user.findFirst({
          where: {
            email: profile?.email,
          },
        });

        if (!userExist) {
          await prisma.user.create({
            data: {
              username: profile?.name.replace(" ", "").toLowerCase(),
              email: profile?.email,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-expect-error
              image: profile?.picture,
            },
          });
        }
        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error);
        return false;
      }

      return true;
    },
  },
};
