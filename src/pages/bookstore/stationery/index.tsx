import { Layout } from "@/components/layouts/app";
import { Button } from "@/components/ui/client";

function AdminStationeries() {
  return (
    <Layout title="papelería">
      <Button size="small" buttonStyle="normal">
        Hola
      </Button>
      <Button size="medium" backgroundColor="outline-purple">
        Hola
      </Button>
      <Button size="large">Hola</Button>

      <Button buttonStyle="filled" size="medium"  >
        Filled
      </Button>

      <Button buttonStyle="points" backgroundColor="red" >
        Eliminar
      </Button>
      <Button buttonStyle="points" backgroundColor="blue" >
        Crear
      </Button>
      <Button buttonStyle="points" backgroundColor="green" >
        Crear
      </Button>
    </Layout>
  );
}

export default AdminStationeries;
