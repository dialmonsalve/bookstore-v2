import { FormEvent } from "react"

import { useForm, } from "@/hooks"

import { PrivateLayout } from "@/components/layouts"
import { Button, RegisterForm, Spinner } from "@/components/ui"

import { formValidator, newStaffValidationSchema } from "@/helpers"
import { useLoginOrRegistry } from "@/hooks/auth"

export const newStaff = {
  name: '',
  lastName: '',
  username: '',
  email: '',
  phone: '',
  password: '',
  repitePassword: '',
  role: 'vendedor'
}

function AdminUser() {

  const {
    formState,
    areFieldsValid,
    handleBlur,
    handleFieldChange,
    handleResetForm,
    isFormSubmitted,
    isTouched
  } = useForm(newStaff);

  const { registerUser,  errorApiMessage, showError, setShowError} = useLoginOrRegistry("username");

  const errors = formValidator().getErrors(formState, newStaffValidationSchema);

  const handleRegisterClient = async (e: FormEvent) => {
    e.preventDefault();
    setShowError(false);

    if (areFieldsValid(errors)) {
      registerUser.mutate(formState);
      handleResetForm()
    }
  }

  if (registerUser.isLoading) {
    return <Spinner />
  }

  return (
    <PrivateLayout title="Usuarios" >
      <Button
        buttonStyle="iconButton"
        ico="plus"
        top="10%"
        position="fixed"
        right="10%"
      />

      <RegisterForm
        isStaff
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

export default AdminUser;