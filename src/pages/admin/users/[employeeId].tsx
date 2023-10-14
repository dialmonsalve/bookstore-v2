import { GetServerSideProps } from "next";

import { useUpdateEmployee, useEmployee } from "@/hooks/employee";

import { Layout } from "@/components/layouts/app";
import { Alert, Spinner } from "@/components/ui";
import { UpdateEmployeeView } from "@/components/views/user/UpdateEmployeeView";

import { getEmployeeById } from "@/api/employee";
import { IEmployee } from "@/types";

interface Props {
  employee: IEmployee;
  employeeId: string;
}

function UpdateEmployeePage({ employeeId, employee }: Props) {
  const getEmployeeById = useEmployee(employeeId);

  const updateEmployee = useUpdateEmployee();

  return (
    <Layout
      title={`${getEmployeeById.data?.name} ${getEmployeeById.data?.lastName}`}
    >
      <Alert />
      {updateEmployee.isLoading && <Spinner />}

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
