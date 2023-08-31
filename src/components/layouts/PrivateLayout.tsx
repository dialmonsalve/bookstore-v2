import { ReactNode } from "react";

import { PrivateHeader, PrivateSidebar } from "./";

interface Props {
  title: string;
  children: ReactNode | ReactNode[];
}

export const PrivateLayout = ({ title, children }: Props) => {
  return (

    <>
      <PrivateSidebar />
      <div  >
        <PrivateHeader />
        <h1>{title}</h1>
        <main className='private-main' >
          {children}
        </main>
      </div>
    </>
  )
}
