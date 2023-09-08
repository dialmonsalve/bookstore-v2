import { PrivateLayout } from "@/components/layouts";
import { Button } from "@/components/ui";

function AdminBooks() {
  return (
    <PrivateLayout title="libros" >

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
