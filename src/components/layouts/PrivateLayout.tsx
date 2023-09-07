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
        <main className='private-main' >
        <h1>{title}</h1>
          {children}
        </main>
      </div>
    </>
  )
}
