import { ReactNode } from "react";

import { Header, Sidebar } from "./";
import { useFormStore, useUIStore } from "@/stores";
import { Button } from "@/components/ui";
import { useRouter } from "next/router";

interface Props {
  title: string;
  children: ReactNode | ReactNode[];
}

export const Layout = ({ title, children }: Props) => {
  const router = useRouter();
  const reset = useUIStore((state) => state.resetPage);
  const handleResetForm = useFormStore((state) => state.handleResetForm);
  const clearItems = useUIStore((state) => state.clearItems);

  const handleBack = () => {
    router.back();
    clearItems();
    reset();
    handleResetForm({});
  };

  return (
    <>
      <Sidebar />
      <Header />
      <Button onClick={handleBack} buttonStyle="back">
        atrás
      </Button>

      <main className="private-main">
        <h1>{title}</h1>
        {children}
      </main>
    </>
  );
};
