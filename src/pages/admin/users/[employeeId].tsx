import { FormEvent } from "react";
import { GetServerSideProps } from "next";

import {  useEmployeeMutation, useEmployee } from "@/hooks/employee";
import { useFormStore } from "@/store/form";

import { Layout } from "@/components/layouts/app";
import { CreateEditPerson } from "@/components/ui/services";
import { Alert, Button, Select, Spinner } from "@/components/ui/client";

import { formValidator } from "@/helpers";
import { getEmployeeById } from "@/api/employee";
import { USER_VALIDATION_SCHEMA } from "@/constants";
import { IEmployee } from "@/types";

interface Props {
  employee: IEmployee;
  employeeId: string;
}

function UpdateEmployeePage({ employeeId, employee }: Props) {
  const {getEmployeeByIdQuery} = useEmployee(employeeId);

  const formState = useFormStore<IEmployee>((state) => state.formState);
  const checkFormErrors = useFormStore((state) => state.checkFormErrors);

  const {updateEmployeeMutation} = useEmployeeMutation();

  const errors = formValidator().getErrors(
    formState,
    USER_VALIDATION_SCHEMA.updateEmployee
  );

  const handleUpdateEmployee = (e: FormEvent) => {
    e.preventDefault();
    const hasFormErrors = checkFormErrors(errors);

    if (!hasFormErrors) {
      console.log(formState);

      updateEmployeeMutation.mutate({_id:employeeId, employee:formState});
    }
  };

  return (
    <Layout
      title={`${getEmployeeByIdQuery.data?.name} ${getEmployeeByIdQuery.data?.lastName}`}
    >
      <Alert />
      {updateEmployeeMutation.isLoading && <Spinner />}

      <form
        className="form"
        style={{ width: "60rem" }}
        onSubmit={handleUpdateEmployee}
      >
        <CreateEditPerson
          initialForm={getEmployeeByIdQuery.data as Record<string, any>}
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
            disabled={!!errors || updateEmployeeMutation.isLoading}
          >
            {`${updateEmployeeMutation.isLoading ? "Espere" : "Actualiza Usuario"} `}
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
