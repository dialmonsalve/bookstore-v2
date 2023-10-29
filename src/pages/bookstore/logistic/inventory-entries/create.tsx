import { Layout } from "@/components/layouts/app";
import { CreateInventoryEntryView } from "@/components/views/InventoryEntries/CreateInventoryEntryView";

export default function CreateInventoryEntriesPage() {
  return (
    <Layout title="Ingresar Productos">
      <div className="transactions">
        <CreateInventoryEntryView />
      </div>
    </Layout>
  );
}
