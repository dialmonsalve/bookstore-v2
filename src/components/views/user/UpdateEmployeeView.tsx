import { FormEvent } from "react";

import { useFormStore } from "@/store";
import { useEmployee, useUpdateEmployee } from "@/hooks/employee";

import { Select, Button } from "@/components/ui";
import { CreateEditPerson } from "..";

import { formValidator } from "@/helpers";
import { EMPLOYEE_VALIDATION_SCHEMA } from "@/constants";
import { IEmployee } from "@/types";

interface Props {
  employeeId: string;
}

export const UpdateEmployeeView = ({ employeeId }: Props) => {
  const updateEmployee = useUpdateEmployee();
  const formState = useFormStore<IEmployee>((state) => state.formState);
  const checkFormErrors = useFormStore((state) => state.checkFormErrors);
  const getEmployeeById = useEmployee(employeeId);

  const errors = formValidator().getErrors(
    formState,
    EMPLOYEE_VALIDATION_SCHEMA.updateEmployee
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
        options={EMPLOYEE_VALIDATION_SCHEMA.ROLES}
        value={formState.role}
        name={"role"}
        multiple
        label="roles"
        errors={errors}
      />
      <div className="container-button">
        <Button
          type="submit"
          backgroundColor="green"
          disabled={!!errors || updateEmployee.isLoading}
        >
          {`${updateEmployee.isLoading ? "Espere" : "Actualiza Usuario"} `}
        </Button>
      </div>
    </form>
  );
};
