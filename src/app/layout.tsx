import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-lexical/styles.css";
import "./globals.css";
import Provider from "@/components/Provider";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kodocs",
  description: "Collaborate your writting with kodocs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${inter.className}  antialiased text-text`}>
          <Provider>
            <main className="bg-background h-full flex flex-col">
              {children}
            </main>
          </Provider>
        </body>
      </html>
    </AuthProvider>
  );
}
