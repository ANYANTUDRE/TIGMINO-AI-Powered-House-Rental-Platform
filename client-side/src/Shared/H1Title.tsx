import React, { ReactNode } from "react"

interface Props {
  styling?: string;
  children: ReactNode;
}

function H1Title({ styling, children }: Props) {

  return(
    <h1 className={`${styling} font-bold text-[30px]`}>
      { children }
    </h1>
  )
}

export default H1Title;