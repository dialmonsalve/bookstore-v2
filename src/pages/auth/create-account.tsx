import { FormEvent, useState } from "react";
import Link from "next/link";

import { useForm, useRegisterUser } from "@/hooks";

import { PublicLayout } from "@/components/layouts";
import { Button, FormControl, ErrorMessage, ApiMessageError } from "@/components/ui";

import { formValidator, newUser, newUserValidationSchema } from "@/helpers";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { Spinner } from "@/components/ui/Spinner";


function CreateAccount() {

  const {
    formState,
    isFormSubmitted,
    isTouched,
    handleBlur,
    handleFieldChange,
    areFieldsValid,
    handleResetForm
  } = useForm(newUser)

  const { registerClient, isLoading, errorApiMessage, showError, setShowError } = useRegisterUser();

  const { email, lastName, name, password, phone, repitePassword } = formState;

  const errors = formValidator().getErrors(formState, newUserValidationSchema);

  console.log(isLoading);
  

  const handleRegisterClient = async (e: FormEvent) => {
    e.preventDefault();
    setShowError(false);

    if (areFieldsValid(errors)) {
      registerClient({ email, password, name })
    }
  }

  if(isLoading){
    return <Spinner />
  }


  return (
    <PublicLayout
      title={'Crea tu cuenta y comienza a volar'}
      pageDescription={'Creación de cuenta en diaBbooks para comenzar a usar nuestros servicios'}
    >
      <h1 >Crea tu cuenta y comienza a volar</h1>

      <ApiMessageError
      showError={showError}
      errorApiMessage={errorApiMessage}
      />
      <form style={{ width: "60rem" }} className="form" onSubmit={handleRegisterClient} >

        <div>
          <FormControl
            label="nombre"
            name="name"
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={handleFieldChange}
            onBlur={handleBlur}
          />
          <ErrorMessage
            fieldName={errors?.name}
            isFormSubmitted={isFormSubmitted}
            isTouched={isTouched?.name}
          />

        </div>

        <div>
          <FormControl
            label="apellido"
            name="lastName"
            type="text"
            placeholder="Tu apellido"
            value={lastName}
            onChange={handleFieldChange}
            onBlur={handleBlur}
          />
          <ErrorMessage
            fieldName={errors?.lastName}
            isFormSubmitted={isFormSubmitted}
            isTouched={isTouched?.lastName}
          />
        </div>

        <div>
          <FormControl
            label="email"
            name="email"
            type="email"
            placeholder="Tu email"
            value={email}
            onChange={handleFieldChange}
            onBlur={handleBlur}
          />
          <ErrorMessage
            fieldName={errors?.email}
            isFormSubmitted={isFormSubmitted}
            isTouched={isTouched?.email}
          />
        </div>

        <div>
          <FormControl
            label="Teléfono"
            name="phone"
            type="phone"
            placeholder="tu Teléfono"
            value={phone}
            onChange={handleFieldChange}
            onBlur={handleBlur}
          />
          <ErrorMessage
            fieldName={errors?.phone}
            isFormSubmitted={isFormSubmitted}
            isTouched={isTouched?.phone}
          />
        </div>

        <div>
          <FormControl
            label="password"
            name="password"
            type="password"
            placeholder="Tu password"
            value={password}
            onChange={handleFieldChange}
            onBlur={handleBlur}
          />

          <ErrorMessage
            fieldName={errors?.password}
            isFormSubmitted={isFormSubmitted}
            isTouched={isTouched?.password}
          />
        </div>

        <div>
          <FormControl
            label="repite password"
            name="repitePassword"
            type="password"
            placeholder="Repite tu password"
            value={repitePassword}
            onChange={handleFieldChange}
            onBlur={handleBlur}
          />
          <ErrorMessage
            fieldName={errors?.repitePassword}
            isFormSubmitted={isFormSubmitted}
            isTouched={isTouched?.repitePassword}
          />
        </div>

        <div style={{ display: 'flex' }}>
          <Button type="submit" width='40%' backgroundColor="green" disabled={!!errors} >
            Crea Cuenta
          </Button>

          <Link href='login' className="btn btn--blue btn--medium" >
            Login
          </Link>
        </div>
      </form>

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

export default CreateAccount