import { PrivateLayout } from "@/components/layouts";
import { Button } from "@/components/ui";

function AdminUser() {
  return (
    <PrivateLayout title="Usuarios" >
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

export default AdminUser;