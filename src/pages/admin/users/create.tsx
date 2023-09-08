import { FormEvent } from "react"

import { useForm, } from "@/hooks"

import { PrivateLayout } from "@/components/layouts"
import {  RegisterForm, Spinner } from "@/components/ui"

import { formValidator, newEmployee, newEmployeeValidationSchema } from "@/helpers"
import { useRegisterEmployee } from "@/hooks/auth"

function CreateEmployeePage  ()  {
  const {
    formState,
    areFieldsValid,
    handleBlur,
    handleFieldChange,
    handleResetForm,
    isFormSubmitted,
    isTouched
  } = useForm(newEmployee);

  const { registerEmployee,  errorApiMessage, showError, setShowError} = useRegisterEmployee();

  const errors = formValidator().getErrors(formState, newEmployeeValidationSchema);

  const handleRegisterClient = async (e: FormEvent) => {
    e.preventDefault();
    setShowError(false);

    if (areFieldsValid(errors)) {
      const { repitePassword, ...restFormState } = formState;
      registerEmployee.mutate({ repitePassword, ...restFormState });
      handleResetForm()
    }
  }

  if (registerEmployee.isLoading) {
    return <Spinner />
  }


   return (
    <PrivateLayout title="Usuarios" >
    
      <RegisterForm
        isEmployee
        formState={formState}
        errorApiMessage={errorApiMessage}
        errors={errors}
        isFormSubmitted={isFormSubmitted}
        isTouched={isTouched}
        showError={showError}
        handleBlur={handleBlur}
        handleFieldChange={handleFieldChange}
        onSubmit={handleRegisterClient}
      />
    </PrivateLayout>
  )
}

export default CreateEmployeePage