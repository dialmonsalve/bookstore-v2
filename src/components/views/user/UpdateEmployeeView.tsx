import { FormEvent } from "react";

import {
  useUpdateEmployee,
  useGetEmployeeById,
} from "@/plugins/dependencies/employeeDependency";

import { useFormStore } from "@/stores";

import { CreateEditPerson } from "../";
import { Select, Button } from "@/components/ui";

import { formValidator } from "@/helpers";
import { EMPLOYEE_VALIDATION_SCHEMA } from "@/constants";
import { IEmployee } from "@/types";

interface Props {
  employeeId: string;
}

export const UpdateEmployeeView = ({ employeeId }: Props) => {
  const formState = useFormStore<IEmployee>((state) => state.formState);
  const checkFormErrors = useFormStore((state) => state.checkFormErrors);
  const employeeUpdate = useUpdateEmployee();
  const employeeGetById = useGetEmployeeById(employeeId);

  const errors = formValidator().getErrors(
    formState,
    EMPLOYEE_VALIDATION_SCHEMA.updateEmployee
  );

  const handleUpdateEmployee = (e: FormEvent) => {
    e.preventDefault();
    const hasFormErrors = checkFormErrors(errors);

    if (!hasFormErrors) {
      employeeUpdate.update({ _id: employeeId, employee: formState });
    }
  };
  return (
    <form
      className="form"
      style={{ width: "60rem" }}
      onSubmit={handleUpdateEmployee}
    >
      <CreateEditPerson
        initialForm={employeeGetById.getById as Record<string, any>}
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
          disabled={!!errors || employeeUpdate.IsUpdateLoading}
        >
          {`${
            employeeUpdate.IsUpdateLoading ? "Espere" : "Actualiza Usuario"
          } `}
        </Button>
      </div>
    </form>
  );
};
