import React from "react";
import Image from "next/image";
const Loader = () => {
  return (
    <div className="h-screen w-full items-center justify-center flex">
      <Image
        alt="loading"
        src="/icons/loading.svg"
        width={32}
        height={32}
        className="animate-spin"
      />
      Please wait...
    </div>
  );
};

export default Loader;
