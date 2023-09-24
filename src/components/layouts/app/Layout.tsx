import { ReactNode } from "react";

import { Header, Sidebar } from "./";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/client";
import { useFormStore } from "@/store/form";

interface Props {
  title: string;
  children: ReactNode | ReactNode[];
}

export const Layout = ({ title, children }: Props) => {

  const router = useRouter();
  const handleResetForm = useFormStore(state => state.handleResetForm)

  const handleBack = () => {
    router.back()
    handleResetForm({})
  }

  return (
    <>
      <Sidebar />
      <Header />
      <main className='private-main' >
        <Button
          buttonStyle="iconButton"
          ico="back"
          onClick={handleBack}
        />
        <h1>{title}</h1>
        {children}
      </main>
    </>
  )
}
