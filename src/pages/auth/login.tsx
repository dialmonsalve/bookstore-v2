import { FormEvent } from "react";
import Link from "next/link";
import { useForm } from "@/hooks/useForm";

import { PublicLayout } from "@/components/layouts"
import { login, loginValidationSchema, formValidator } from "@/helpers";
import { LoginForm } from "@/components/ui/LoginForm";

function Login() {

  const { formState,isTouched, isFormSubmitted,handleFieldChange, handleBlur,areFieldsValid } = useForm(login);

  const { email, password } = formState;

  const errors = formValidator().getErrors(formState, loginValidationSchema);

  console.log(formState);
  

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (areFieldsValid(errors)) {
      console.log({ email, password });

      // TODO implement validation vs backend
    }
  }
  return (
    <PublicLayout title={'login'} pageDescription={'Find your dreams books here'}>

      <h1 style={{ marginBottom: '6rem' }} >Enter and the magic begins</h1>

      <LoginForm
        formState={formState}
        errors={errors}
        onSubmit={handleSubmit}
        isFormSubmitted={isFormSubmitted}
        isTouched={isTouched}
        handleFieldChange={handleFieldChange}
        handleBlur={handleBlur} />
    </PublicLayout>
  )
}

export default Login