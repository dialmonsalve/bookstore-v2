import { Layout } from "@/components/layouts/app";
import { Button } from "@/components/ui/client";
import { InputForm } from "@/components/ui/client/TableInputForm";

function AdminStationeries() {
  return (
    <Layout title="papelería" >
      <Button
        buttonStyle="iconButton"
        ico="plus"
        top="26vh"
        position="fixed"
        right="3%"
      />

      <InputForm />

    </Layout>
  )
}

export default AdminStationeries;