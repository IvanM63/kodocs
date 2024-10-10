import Image from "next/image";
import Link from "next/link";

interface HeaderInterface {
  children?: React.ReactNode;
  classname?: string;
}

const Header: React.FC<HeaderInterface> = (props) => {
  return (
    <header className="flex flex-row items-center justify-between h-auto py-5 md:px-12 p-4">
      {/* First row */}
      <div className="flex flex-row space-x-2 items-center">
        <Link href="/">
          <Image
            alt="logo"
            src="/assets/kodocs_logo_no_text.png"
            width={37}
            height={37}
          />
        </Link>
        <p className="sm:flex hidden font-semibold">kodocs</p>
      </div>
      {/* Second row */}
      {props.children}
      {/* Third Row */}
    </header>
  );
};

export default Header;
