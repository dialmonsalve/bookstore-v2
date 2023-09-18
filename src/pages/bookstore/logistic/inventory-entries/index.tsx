import { Layout } from "@/components/layouts/app";
import { Button } from "@/components/ui/client";
import { useRouter } from "next/router";


export default function InventoryEntriesPage() {

  const router = useRouter()
  return (
    <Layout title="Entradas de inventario" >

      <Button
        buttonStyle="iconButton"
        ico="plus"
        top="26vh"
        position="fixed"
        right="3%"
        onClick={() => router.push('inventory-entries/create')}
      />

    </Layout>
  )
}