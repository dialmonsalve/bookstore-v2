import { PrivateHeader } from "../ui/PrivateHeader"
import { PrivateSidebar } from "../ui/PrivateSidebar"

import { ReactNode } from "react";


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
