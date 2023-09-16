import { ReactNode } from "react";

import { Header, Sidebar } from "./";
import router from "next/router";
import { Button } from "@/components/ui/client";

interface Props {
  title: string;
  children: ReactNode | ReactNode[];
}

export const Layout = ({ title, children }: Props) => {

  return (
    <>
      <Sidebar />
      <Header />
      <main className='private-main' >
      <Button
          buttonStyle="iconButton"
          ico="back"
          onClick={()=>router.back()}
         />
        <h1>{title}</h1>
        {children}
      </main>
    </>
  )
}
