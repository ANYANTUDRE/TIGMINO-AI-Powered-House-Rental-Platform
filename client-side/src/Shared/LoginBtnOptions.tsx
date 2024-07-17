import React, { ReactNode } from "react";

interface BtnTypes {
  children: ReactNode;
  hasBorder: boolean;
  onClick?: () => void;
}

function LoginBtnOptions({ hasBorder, children, onClick }: BtnTypes) {

  return(
    <button 
      onClick={onClick}
      className={`${hasBorder ? "border-b border-white" : ""} hover:bg-terracotta hover:text-white py-2 duration-300`}
    >
      { children }
    </button>
  )
}

export default LoginBtnOptions;