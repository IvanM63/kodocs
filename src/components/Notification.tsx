"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Notification as NotificationIcon } from "iconsax-react";
import {
  useInboxNotifications,
  useUnreadInboxNotificationsCount,
} from "@liveblocks/react";
import {
  InboxNotification,
  InboxNotificationList,
  LiveblocksUIConfig,
} from "@liveblocks/react-ui";

const Notification = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { inboxNotifications } = useInboxNotifications();
  const { count } = useUnreadInboxNotificationsCount();

  const unreadNotifications = inboxNotifications?.filter(
    (notification) => !notification.readAt
  );

  //Mouse event when user clicked outside the notification div
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
      <NotificationIcon width={24} height={24} />
      {count! > 0 && (
        <div className="absolute right-1 top-1 z-20 size-2 rounded-full bg-blue-500" />
      )}
      {open ? (
        <div
          id="dropdownNotification"
          className="z-20 absolute top-12 right-0 w-96 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700"
        >
          {/* HEADER DROPDOWN */}
          <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
            Notifications
          </div>

          {/* MAIN DROPDOWN */}
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            <LiveblocksUIConfig
              overrides={{
                INBOX_NOTIFICATION_TEXT_MENTION: (user: ReactNode) => {
                  return <>{user} mention you</>;
                },
              }}
            >
              <InboxNotificationList>
                {unreadNotifications!.length <= 0 ? (
                  <p className="text-center text-sm p-4 text-gray-400">
                    There is no notification yet
                  </p>
                ) : (
                  <div>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {unreadNotifications?.map((inboxNotification: any) => (
                      <InboxNotification
                        key={inboxNotification.id}
                        inboxNotification={inboxNotification}
                        href={`/documents/${inboxNotification.roomId}`}
                        showActions={false}
                        kinds={{
                          thread: (props) => (
                            <InboxNotification.Thread
                              {...props}
                              showRoomName={false}
                              showActions={false}
                            />
                          ),
                          textMention: (props) => {
                            return (
                              <InboxNotification.TextMention
                                {...props}
                                showRoomName={false}
                              />
                            );
                          },
                          $documentAccess: (props) => {
                            const { title, avatar } =
                              props.inboxNotification.activities[0].data;

                            return (
                              <InboxNotification.Custom
                                {...props}
                                title={title}
                                aside={
                                  <InboxNotification.Icon className="bg-transparent">
                                    <Image
                                      src={(avatar as string) || ""}
                                      width={40}
                                      height={40}
                                      alt="avatar"
                                      className="rounded-full"
                                    />
                                  </InboxNotification.Icon>
                                }
                              >
                                {props.children}
                              </InboxNotification.Custom>
                            );
                          },
                        }}
                      />
                    ))}
                  </div>
                )}
              </InboxNotificationList>
            </LiveblocksUIConfig>
          </div>

          {/* FOOTER DROPDOWN */}
          <a
            href="#"
            className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
          >
            <div className="inline-flex items-center ">
              <svg
                className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 14"
              >
                <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
              </svg>
              View all
            </div>
          </a>
        </div>
      ) : null}
    </div>
  );
};

export default Notification;
