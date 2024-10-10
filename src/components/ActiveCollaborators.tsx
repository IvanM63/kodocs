import { useOthers } from "@liveblocks/react/suspense";
import Image from "next/image";
import React from "react";

const ActiveCollaborators = () => {
  const others = useOthers();
  const collaborators = others.map((other) => other.info);
  if (collaborators.length) console.log(collaborators[0].color);

  return (
    <div className="flex space-x-1">
      {collaborators.map(({ id, avatar, color }) => (
        <div key={id}>
          <Image
            alt="avatar"
            src={avatar}
            width={32}
            height={32}
            className={`border-2 border-[${String(color)}] rounded-full `}
          />
        </div>
      ))}
    </div>
  );
};

export default ActiveCollaborators;
