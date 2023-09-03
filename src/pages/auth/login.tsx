import { FormEvent, useEffect, useState } from "react";

import { GetServerSideProps } from 'next';
import { signIn, getProviders, getSession, useSession } from "next-auth/react";
import Image from "next/image";

import { useForm } from "@/hooks/useForm";

import { PublicLayout } from "@/components/layouts"
import { Button, LoginForm } from "@/components/ui";

import { login, loginValidationSchema, formValidator } from "@/helpers";
import { useRegisterUser } from "@/hooks/useRegisterUser";

function Login() {

  const { formState, isTouched, isFormSubmitted, handleFieldChange, handleBlur, areFieldsValid, handleResetForm } = useForm(login);
  const { handleLoginCLient } = useRegisterUser();
  const [providers, setProviders] = useState<any>({});
  const [showError, setShowError] = useState(false);
  const [errorApiMessage, setErrorApiMessage] = useState('');

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
      const { hasError, message } = await handleLoginCLient(email, password);
      if (hasError) {
        setShowError(true);
        setErrorApiMessage(message!)
        setTimeout(() => setShowError(false), 3000);
        handleResetForm();
        return;
      }
      await signIn('credentials', { email, password });
      handleResetForm();
    }
  }

  return (
    <PublicLayout
      title={'Ingresa y comienza a encontrar los libros que necesitas'}
      pageDescription={'Página para hacer login en diabooks. Permite a nuestros usuarios hacer sus compras e inscribirse a nuestros boletines'}>

      <h1 >Enter and the magic begins</h1>
      {showError && <div style={{ margin: '0 auto', fontSize: '1.6rem', backgroundColor: 'red', color: 'white', padding: '1rem 2rem', borderRadius: '1.5rem', textAlign: 'center' }} >{errorApiMessage}</div>}
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
              onClick={() => signIn(provider.id)}
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