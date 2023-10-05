import { FormEvent } from "react";

import { useEmployeeMutation } from "@/hooks/employee";
import { useFormStore } from "@/store/form";

import { Layout } from "@/components/layouts/app";
import { Alert, Button, Select, Spinner } from "@/components/ui/client";
import { CreateEditPerson } from "@/components/ui/services";

import { formValidator } from "@/helpers";
import { USER_VALIDATION_SCHEMA } from "@/constants";

const newEmployee = {
  name: "",
  lastName: "",
  username: "",
  email: "",
  phone: "",
  password: "",
  repitePassword: "",
  role: "",
};

function CreateEmployeePage() {
  const {createEmployeeMutation} = useEmployeeMutation();

  const formState = useFormStore((state) => state.formState);
  const checkFormErrors = useFormStore((state) => state.checkFormErrors);
  const options = useFormStore((state) => state.options);

  const errors = formValidator().getErrors(
    formState,
    USER_VALIDATION_SCHEMA.newEmployee
  );

  const handleRegisterEmployee = (e: FormEvent) => {
    e.preventDefault();
    const hasFormErrors = checkFormErrors(errors);

    if (!hasFormErrors) {
      const { repitePassword, ...newEmployee } = formState;
      createEmployeeMutation.mutate(newEmployee);
    }
  };  

  return (
    <Layout title="Usuarios">
      <Alert />
      {createEmployeeMutation.isLoading && <Spinner />}

      <form
        method="POST"
        style={{ width: "60rem" }}
        className="form"
        onSubmit={handleRegisterEmployee}
      >
        <CreateEditPerson
          initialForm={newEmployee}
          errors={errors}
          isCreate
          isEmployee
        />
        <Select
          options={USER_VALIDATION_SCHEMA.ROLES}
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
            disabled={!!errors || createEmployeeMutation.isLoading}
          >
            {`${createEmployeeMutation.isLoading ? "Espere" : "Crear Cuenta"} `}
          </Button>
        </div>
      </form>
    </Layout>
  );
}

export default CreateEmployeePage;
