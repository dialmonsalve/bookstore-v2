import { GetServerSideProps } from "next";

import { useGetEmployeeById } from "@/plugins/dependencies/employeeDependency";

import { Layout } from "@/components/layouts/app";
import { Alert, Spinner } from "@/components/ui";
import { UpdateEmployeeView } from "@/components/views/user/UpdateEmployeeView";

import { getEmployeeById } from "@/api/employee";
import { IEmployee } from "@/types";

interface Props {
  employee?: IEmployee;
  employeeId: string;
}

function UpdateEmployeePage({ employeeId }: Props) {
  const  employee = useGetEmployeeById(employeeId);

  return (
    <Layout title={`${employee.getById?.name} ${employee.getById?.lastName}`}>
      {employee.getById?.isLoading && <Spinner />}
      <Alert />

      <UpdateEmployeeView employeeId={employeeId} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { employeeId } = params as { employeeId: string };

  const employee = await getEmployeeById(employeeId);

  return {
    props: {
      employeeId,
      employee,
    },
  };
};

export default UpdateEmployeePage;
