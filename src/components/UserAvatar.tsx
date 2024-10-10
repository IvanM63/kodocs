"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { UserAvatarProps } from "@/types";
import { signOut } from "next-auth/react";

const UserAvatar = ({ user }: UserAvatarProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="flex relative">
      {/* Avatar */}
      <button onClick={() => setOpen(!open)}>
        <Image
          alt="avatar"
          src={user.image || "/assets/avatar_placeholder.svg"}
          width={36}
          height={36}
          className="flex rounded-full active:scale-90 transition-transform transform"
        />
      </button>
      {open ? (
        // Dropdown
        <div
          id="dropdownAvatar"
          className="z-10 absolute top-12 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-96 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div className="flex row space-x-4 px-4 py-3 text-sm  w-full">
            <Image
              alt="avatar"
              src={user.image || "/assets/avatar_placeholder.svg"}
              width={40}
              height={40}
              className="flex rounded-full "
            />
            <div className="flex flex-col">
              <h1 className="font-bold text-base">{user.email}</h1>
              <p className="font-normal text-sm text-gray-400">{user.user}</p>
            </div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200 list-none m-0"
            aria-labelledby="dropdownUserAvatarButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Earnings
              </a>
            </li>
          </ul>
          <button
            onClick={() => signOut()}
            className="py-2 bg-red-500 rounded-b-md hover:bg-red-600 active:bg-red-700 w-full "
          >
            <p className="text-center block px-4 py-2 text-sm text-white active:scale-90">
              Sign out
            </p>
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default UserAvatar;
