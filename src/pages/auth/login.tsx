import { FormEvent, useEffect, useState } from "react";

import { useForm } from "@/hooks/useForm";

import { PublicLayout } from "@/components/layouts"
import { Button, LoginForm } from "@/components/ui";

import { login, loginValidationSchema, formValidator } from "@/helpers";
import { signIn, getProviders } from "next-auth/react";

function Login() {

  const { formState, isTouched, isFormSubmitted, handleFieldChange, handleBlur, areFieldsValid } = useForm(login);
  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then(prov => {
      setProviders(prov)
    })
  }, [])


  const { email, password } = formState;

  const errors = formValidator().getErrors(formState, loginValidationSchema);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log({ email, password });


    if (areFieldsValid(errors)) {

      // TODO implement validation vs backend
      // await signIn('credentials', {email, password})
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

      {
        Object.values(providers).map((provider: any) => {
          if (provider.id === 'credentials') return (<div key='credentials' ></div>);

          return (
            <Button
              key={provider.id}
              onClick={() => signIn(provider.id)}
            >{provider.name}
            </Button>
          )
        })
      }
    </PublicLayout>
  )
}

export default Login