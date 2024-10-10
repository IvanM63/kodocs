"use client";
import { UserTypeSelectorParams } from "@/types";
import { ArrowDown2 } from "iconsax-react";
import React, { useEffect, useRef, useState } from "react";

const UserTypeSelector = ({
  userType,
  setUserType,
  onClickHandler,
}: UserTypeSelectorParams) => {
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
    <div
      ref={dropdownRef}
      className="cursor-pointer flex flex-row items-center relative"
      onClick={() => setOpen(!open)}
    >
      can {userType}
      <ArrowDown2 className="ml-2" size="16" />
      {open ? (
        <ul className="m-0 absolute right-0 left-0 top-6 rounded-md p-0 list-none shadow-md text-center bg-white mt-2 items-center justify-center">
          <li
            className="w-full p-2 hover:bg-gray-200"
            onClick={() => {
              setUserType("viewer");
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              onClickHandler && onClickHandler("viewer");
            }}
          >
            Viewer
          </li>
          <li
            className="w-full p-2 hover:bg-gray-200"
            onClick={() => {
              setUserType("editor");
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              onClickHandler && onClickHandler("editor");
            }}
          >
            Editor
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default UserTypeSelector;
