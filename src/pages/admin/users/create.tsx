import { useCreateEmployee } from "@/plugins/dependencies/employeeDependency";

import { CreateEmployeeView } from "@/components/views/user/CreateEmployeeView";

import { Layout } from "@/components/layouts/app";
import { Alert, Spinner } from "@/components/ui";

function CreateEmployeePage() {
  const employee = useCreateEmployee();

  return (
    <Layout title="Usuarios">
      {employee.IsCreateLoading && <Spinner />}
      <Alert />

      <CreateEmployeeView />
    </Layout>
  );
}

export default CreateEmployeePage;
