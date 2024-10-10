import React, { ReactNode } from "react";

interface MyButtonProps {
  name?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  icon?: ReactNode;
  disabled?: boolean;
}

const MyButton: React.FC<MyButtonProps> = (props) => {
  const handleChildClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (props.onClick) {
      props.onClick(event);
    }
  };
  return (
    <button
      disabled={props.disabled}
      onClick={handleChildClick}
      className={`${props.className} flex flex-row space-x-1 bg-primary text-white rounded-md items-center px-4 py-1 justify-center
 active:bg-persian-blue-900   outline-persian-blue-200 disabled:outline-gray-200 disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed   `}
    >
      {props.icon}
      <p className="text-sm ">{props.name}</p>
    </button>
  );
};

export default MyButton;
