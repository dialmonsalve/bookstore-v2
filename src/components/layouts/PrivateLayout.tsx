import { ReactNode } from "react";

import { PrivateHeader, PrivateSidebar } from "./";
import { QueryProvider } from "@/context/providers/QueryProvider";

interface Props {
  title: string;
  children: ReactNode | ReactNode[];
}

export const PrivateLayout = ({ title, children }: Props) => {

  return (
    <>
      <PrivateSidebar />
      <PrivateHeader />
      <main className='private-main' >
        <h1>{title}</h1>
        {children}
      </main>
    </>
  )
}
