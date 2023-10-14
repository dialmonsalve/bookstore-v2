import { useCreateEmployee } from "@/hooks/employee";

import { Layout } from "@/components/layouts/app";
import { Alert, Spinner } from "@/components/ui";

import { CreateEmployeeView } from "@/components/views/user/CreateEmployeeView";

function CreateEmployeePage() {
  const createEmployee = useCreateEmployee();

  return (
    <Layout title="Usuarios">
      <Alert />
      {createEmployee.isLoading && <Spinner />}

      <CreateEmployeeView />
    </Layout>
  );
}

export default CreateEmployeePage;
