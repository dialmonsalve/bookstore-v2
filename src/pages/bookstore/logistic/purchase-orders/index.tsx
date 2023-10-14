import { Layout } from "@/components/layouts/app";
import { Alert, Button } from "@/components/ui";
import { useRouter } from "next/router";

export default function PurchaseOrdersPage() {

  const router = useRouter()

  return (
    <Layout title="Ordenes de compra" >
      <Alert />
      <Button
        buttonStyle="iconButton"
        ico="plus"
        top="26vh"
        position="fixed"
        right="3%"
        onClick={() => router.push('purchase-orders/create')}
      />

    </Layout>
  )
}