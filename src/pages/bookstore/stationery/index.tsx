import { Layout } from "@/components/layouts/app";
import { Button } from "@/components/ui/client";

function AdminStationeries() {
  return (
    <Layout title="papelería" >
            <Button
        buttonStyle="iconButton"
        ico="plus"
        bottom="10%"
        position="fixed"
        right="10%"
      />

    </Layout>
  )
}

export default AdminStationeries;