import { ReactNode } from "react";

import { Header, Sidebar } from "./";

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

        <h1>{title}</h1>
        {children}
      </main>
    </>
  )
}
