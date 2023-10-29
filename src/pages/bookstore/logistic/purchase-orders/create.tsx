import { Layout } from "@/components/layouts/app";
import {
  Alert,
  Button,
  Modal,
} from "@/components/ui";

import { usePurchaseOrders } from "@/hooks/views";

import { CreateInventoryPurchaseView } from "@/components/views/InventoryPurchase/CreateInventoryPurchaseView";
import { useFormStore } from "@/stores";

export default function CreatePurchaseOrdersPage() {
  const { router, setShowModal } = usePurchaseOrders();
  const resetForm = useFormStore(state=>state.handleResetForm)

  const handleNavigation = () => {
    setShowModal(false);

    router.push("/bookstore/books/create");
    resetForm({})
  };

  return (
    <>
      <Modal typeModal="error">
        <Button onClick={handleNavigation}>Crear libro</Button>
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
