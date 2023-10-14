import { ReactNode, useEffect } from "react";

import { Header, Sidebar } from "./";
import { useFormStore, useUITransactionStore, useUisStore } from "@/store";
import { Button } from "@/components/ui";
import { useRouter } from "next/router";

interface Props {
  title: string;
  children: ReactNode | ReactNode[];
}

export const Layout = ({ title, children }: Props) => {

  const router = useRouter();
  const reset = useUisStore(state => state.resetPage);
  const handleResetForm = useFormStore(state => state.handleResetForm);
  const clearAllItems = useUITransactionStore((state) => state.clearAllItems);

  const handleBack = () => {
    router.back();
    clearAllItems();
    reset();
    handleResetForm({});
  };

  return (
    <>
      <Sidebar />
      <Header />
      <Button onClick={handleBack} buttonStyle="back" >atrás</Button>

      <main className="private-main">
        <h1>{title}</h1>
        {children}
      </main>
    </>
  );
};
