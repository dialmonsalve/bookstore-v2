import { FormEvent } from "react";
import { GetServerSideProps } from "next";

import { useUpdateEmployee, useEmployee } from "@/hooks/employee";
import { useFormStore } from "@/store/form";

import { Layout } from "@/components/layouts/app";
import { CreateEditPerson } from "@/components/views";
import { Alert, Button, Select, Spinner } from "@/components/ui";

import { formValidator } from "@/helpers";
import { getEmployeeById } from "@/api/employee";
import { USER_VALIDATION_SCHEMA } from "@/constants";
import { IEmployee } from "@/types";

interface Props {
  employee: IEmployee;
  employeeId: string;
}

function UpdateEmployeePage({ employeeId, employee }: Props) {
  const getEmployeeById = useEmployee(employeeId);

  const formState = useFormStore<IEmployee>((state) => state.formState);
  const checkFormErrors = useFormStore((state) => state.checkFormErrors);

  const updateEmployee = useUpdateEmployee();

  const errors = formValidator().getErrors(
    formState,
    USER_VALIDATION_SCHEMA.updateEmployee
  );

  const handleUpdateEmployee = (e: FormEvent) => {
    e.preventDefault();
    const hasFormErrors = checkFormErrors(errors);

    if (!hasFormErrors) {
      console.log(formState);

      updateEmployee.mutate({ _id: employeeId, employee: formState });
    }
  };

  return (
    <Layout
      title={`${getEmployeeById.data?.name} ${getEmployeeById.data?.lastName}`}
    >
      <Alert />
      {updateEmployee.isLoading && <Spinner />}

      <form
        className="form"
        style={{ width: "60rem" }}
        onSubmit={handleUpdateEmployee}
      >
        <CreateEditPerson
          initialForm={getEmployeeById.data as Record<string, any>}
          errors={errors}
          isCreate={false}
          isEmployee
        />
        <Select
          options={USER_VALIDATION_SCHEMA.ROLES}
          value={formState.role}
          name={"role"}
          multiple
          label="roles"
          errors={errors}
        />
        <div>
          <Button
            type="submit"
            backgroundColor="green"
            disabled={!!errors || updateEmployee.isLoading}
          >
            {`${updateEmployee.isLoading ? "Espere" : "Actualiza Usuario"} `}
          </Button>
        </div>
      </form>
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
