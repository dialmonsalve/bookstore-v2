import { PrivateLayout } from "@/components/layouts";
import { Button } from "@/components/ui";

function AdminToys  () {
  return (
    <PrivateLayout title="juguetes" >
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

export default AdminToys;
