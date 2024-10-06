import React, {ReactNode, MouseEventHandler} from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "reset" | "submit";
}

const Button = ({children, type = 'button', onClick = () => {}}: ButtonProps) => {

  return (
    <button type={type} onClick={onClick} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      {children}
    </button>
  )
}

export default Button