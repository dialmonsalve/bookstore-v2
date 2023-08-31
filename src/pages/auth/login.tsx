import { FormEvent } from "react";

import { useForm } from "@/hooks/useForm";

import { PublicLayout } from "@/components/layouts"
import { LoginForm } from "@/components/ui";

import { login, loginValidationSchema, formValidator } from "@/helpers";

function Login() {

  const { formState, isTouched, isFormSubmitted, handleFieldChange, handleBlur, areFieldsValid } = useForm(login);

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
    <PublicLayout
      title={'Ingresa y comienza a encontrar los libros que necesitas'}
      pageDescription={'Página para hacer login en diabooks. Permite a nuestros usuarios hacer sus compras e inscribirse a nuestros boletines'}>

      <h1 >Enter and the magic begins</h1>

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