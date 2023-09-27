import { FormEvent, useEffect, useState } from "react";
import { GetServerSideProps } from 'next';
import Image from "next/image";
import Link from "next/link";
import { getProviders, getSession } from "next-auth/react";

import { useLogin } from "@/hooks/auth";
import { useForm } from "@/hooks/useForm";
import { useFormStore } from "@/store/form";
import useLoginProviderOrLogout from "@/hooks/auth/useLoginProviderOrLogout";

import { Layout } from "@/components/layouts/e-commerce";
import { ApiMessageError, Button, FormControl } from "@/components/ui/client";

import { LOGIN_VALIDATION_SCHEMA } from "@/constants";
import { formValidator } from "@/helpers";

const login = {
  email: '',
  password: '',
}
const options = [
  {
    _id: 0,
    name: 'email',
    type: 'email',
    label: 'email',
  },
  {
    _id: 1,
    name: 'password',
    type: 'password',
    label: 'password',
  },
]

function Login() {

  const { loginProvider } = useLoginProviderOrLogout()

  const [providers, setProviders] = useState<any>({});
  const loginUser = useLogin("email")
  const formState = useFormStore(state => state.formState);
  const handleResetForm = useFormStore(state => state.handleResetForm);
  const checkFormErrors = useFormStore(state => state.checkFormErrors);

  const errors = formValidator().getErrors(formState, LOGIN_VALIDATION_SCHEMA.client);

  useEffect(() => {
    getProviders().then(prov => {
      setProviders(prov)
    })
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const hasErrors = checkFormErrors(errors);

    if (!hasErrors) {
      handleResetForm(login)
      loginUser.mutate({ email: formState?.email, password: formState?.password });
    }
  }

  return (
    <Layout
      title={'Ingresa y comienza a encontrar los libros que necesitas'}
      pageDescription={'Página para hacer login en diabooks. Permite a nuestros usuarios hacer sus compras e inscribirse a nuestros boletines'}>

      <h1 >Entra para que la magia comience</h1>

      <ApiMessageError />
      <form className="form" onSubmit={handleSubmit} noValidate >
        <FormControl
          
          errors={errors}
          formFields={options}
          className="form-control"
          classNameInput="form-control__input"
          classNameLabel="form-control__label"
          initialForm={login}
        />

        <div className="form__buttons">
          <Button type="submit" width='40%' backgroundColor="blue" disabled={!!errors}  >
            Login
          </Button>

          <Link href='register' className="btn btn--green btn--medium" >
            Crea tu cuenta
          </Link>

        </div>
      </form>

      {

        Object?.values(providers) !== null &&

        Object?.values(providers).map((provider: any) => {
          if (provider.id === 'credentials') return (<div key='credentials' ></div>);

          return (
            <Button
              backgroundColor={provider.name === 'Google' ? 'outline-red' : 'outline-blue'}
              key={provider.id}
              onClick={() => loginProvider.mutate(provider.id)}
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
    </Layout>
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