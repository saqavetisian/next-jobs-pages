import React, {ReactNode, MouseEventHandler} from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  htmlType?: "button" | "reset" | "submit";
  type?: "primary" | "outline";
}

const Button = ({children, htmlType = 'button', type = 'primary', onClick = () => {}}: ButtonProps) => {
  const types = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    outline: 'bg-white text-blue-500 hover:bg-blue-500 hover:text-white border border-blue-500',
  }

  return (
    <button type={htmlType} onClick={onClick} className={`mt-4 px-4 py-2 rounded ${types[type]}`}>
      {children}
    </button>
  )
}

export default Button