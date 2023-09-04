import { FormEvent, useEffect, useState } from "react";

import { GetServerSideProps } from 'next';
import { getProviders, getSession } from "next-auth/react";
import Image from "next/image";

import { useForm } from "@/hooks/useForm";

import { PublicLayout } from "@/components/layouts"
import { ApiMessageError, Button, LoginForm } from "@/components/ui";

import { login, loginValidationSchema, formValidator } from "@/helpers";
import { useLogin, useOAuthClient } from "@/hooks";
import { } from "@/components/ui/ApiMessageError";


function Login() {

  const { formState, isTouched, isFormSubmitted, handleFieldChange, handleBlur, areFieldsValid, handleResetForm } = useForm(login);
  const { loginClient, isLoading, errorApiMessage, showError, setShowError } = useLogin();
  const { loginProvider } = useOAuthClient()

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
    setShowError(false);

    if (areFieldsValid(errors)) {
      handleResetForm()
      loginClient({ email, password });
    }
  }

  return (
    <PublicLayout
      title={'Ingresa y comienza a encontrar los libros que necesitas'}
      pageDescription={'Página para hacer login en diabooks. Permite a nuestros usuarios hacer sus compras e inscribirse a nuestros boletines'}>

      <h1 >Entra para que la magia comience</h1>

      <ApiMessageError
      showError={showError}
      errorApiMessage={errorApiMessage}
      />

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
              backgroundColor={provider.name === 'Google' ? 'outline-red' : 'outline-blue'}
              key={provider.id}
              onClick={() => loginProvider(provider.id)}
              width="30rem"
            > <Image
                priority
                style={{ marginRight: '1rem' }}
                src={provider.name === 'Google' ? '/icons/google.svg' : '/icons/facebook.svg'}
                width={25} height={25} alt='trash' /> Login con {provider.name}
            </Button>
          )
        })
      }
    </PublicLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

  const session = await getSession({ req });

  const { p = '/' } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false
      }
    }
  }

  return {
    props: {

    }
  }
}

export default Login