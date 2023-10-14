import { Button, Select } from "@/components/ui"
import { CreateEditPerson } from ".."
import { NEW_EMPLOYEE, EMPLOYEE_VALIDATION_SCHEMA } from "@/constants"
import { useFormStore } from "@/store";
import { formValidator } from "@/helpers";
import { useCreateEmployee } from "@/hooks/employee";
import { FormEvent } from "react";

export const CreateEmployeeView = () => {

  const formState = useFormStore((state) => state.formState);
  const checkFormErrors = useFormStore((state) => state.checkFormErrors);
  const options = useFormStore((state) => state.options);
  const createEmployee = useCreateEmployee();

  const errors = formValidator().getErrors(
    formState,
    EMPLOYEE_VALIDATION_SCHEMA.newEmployee
  );

  const handleRegisterEmployee = (e: FormEvent) => {
    e.preventDefault();
    const hasFormErrors = checkFormErrors(errors);

    if (!hasFormErrors) {
      const { repitePassword, ...newEmployee } = formState;
      createEmployee.mutate(newEmployee);
    }
  };

  return (
    <form
        method="POST"
        style={{ width: "60rem" }}
        className="form"
        onSubmit={handleRegisterEmployee}
      >
        <CreateEditPerson
          initialForm={NEW_EMPLOYEE.initialForm}
          errors={errors}
          isCreate
          isEmployee
        />
        <Select
          options={EMPLOYEE_VALIDATION_SCHEMA.ROLES}
          name={"role"}
          value={options}
          multiple
          label="roles"
          errors={errors}
        />

        <div className="container-button">
          <Button
            type="submit"
            backgroundColor="green"
            disabled={!!errors || createEmployee.isLoading}
          >
            {`${createEmployee.isLoading ? "Espere" : "Crear Usuario"} `}
          </Button>
        </div>
      </form>
  )
}
