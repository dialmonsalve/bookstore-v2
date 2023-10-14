import { FormEvent } from "react";

import { Layout } from "@/components/layouts/app";
import {
  Alert,
  Button,
  ErrorMessage,
  FormControl,
  Modal,
  Transactions,
} from "@/components/ui";

import { usePurchaseOrders } from "@/hooks/transactions";

import { CreateInventoryPurchaseView } from "@/components/views/InventoryPurchase/CreateInventoryPurchaseView";

export default function CreatePurchaseOrdersPage() {
  const { router, setShowModal } = usePurchaseOrders();

  const handleNavigation = () => {
    setShowModal(false);
    router.push("/bookstore/books/create");
  };

  return (
    <>
      <Modal typeModal="error">
        <Button onClick={handleNavigation}>Crear</Button>
      </Modal>
      <Layout title="Crear Ordenes de compra">
        <Alert />
        <div className="transactions">
          <CreateInventoryPurchaseView />
        </div>
      </Layout>
    </>
  );
}
