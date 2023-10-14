import { FormEvent } from "react";

import { useLogin } from "@/hooks/auth";
import { useFormStore } from "@/store";

import { FormControl, Button } from "@/components/ui";
import { formValidator } from "@/helpers";
import { LOGIN_EMPLOYEE, LOGIN_VALIDATION_SCHEMA } from "@/constants";

export const LoginEmployee = () => {
  const formState = useFormStore((state) => state.formState);
  const loginEmployee = useLogin("username");
  const handleResetForm = useFormStore((state) => state.handleResetForm);
  const checkFormErrors = useFormStore((state) => state.checkFormErrors);

  const errors = formValidator().getErrors(
    formState,
    LOGIN_VALIDATION_SCHEMA.employee
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const hasErrors = checkFormErrors(errors);

    if (!hasErrors) {
      handleResetForm(LOGIN_EMPLOYEE.initialForm);
      loginEmployee.mutate(formState);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <FormControl
        initialForm={LOGIN_EMPLOYEE.initialForm}
        errors={errors}
        formFields={LOGIN_EMPLOYEE.formFields}
        classNameControl="form__control"
        classNameInput="form__input"
        classNameLabel="form__label"
      />
      <div className="container-button">
        <Button type="submit" backgroundColor="green" disabled={!!errors}>
          Login
        </Button>
      </div>
    </form>
  );
};
