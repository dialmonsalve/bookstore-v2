import { PrivateLayout } from "@/components/layouts/PrivateLayout";
import { Button } from "@/components/ui";

function AdminBooks() {
  return (
    <PrivateLayout title="books" >

      <Button
        buttonStyle="iconButton"
        ico="plus"
        bottom="10%"
        position="fixed"
        right="10%"
      />

    </PrivateLayout>
  )
}

export default AdminBooks;
