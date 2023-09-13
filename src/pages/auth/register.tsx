import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import { PublicLayout } from "@/components/layouts";
import { ApiMessageError, Button, ErrorMessage, FormControl, RegisterEmploy } from "@/components/ui";

import { formValidator, newClientValidationSchema } from "@/helpers";
import { useForm } from "@/hooks/useForm";
import { useRegisterCLient } from "@/hooks/auth";
import { FormEvent } from "react";
import Link from "next/link";

const newClient = {
  name: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  repitePassword: ''
};

function CreateCLientPage() {

  const { registerCLient, errorApiMessage, showError } = useRegisterCLient();

  const {
    formState,
    isFormSubmitted,
    isTouched,
    hasErrors,
    handleBlur,
    handleFieldChange,
  } = useForm(newClient)
  const errors = formValidator().getErrors(formState, newClientValidationSchema);

  const handleRegisterClient = async (e: FormEvent) => {
    e.preventDefault();

    const notErrorsForms = hasErrors(errors);

    if (notErrorsForms) {
      const { repitePassword, ...restFormState } = formState;
      registerCLient.mutate({ repitePassword, ...restFormState })
    }
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
      <form method="POST" style={{ width: "60rem" }} className="form" onSubmit={handleRegisterClient}
      >
        <RegisterEmploy
          isEmployee={false}
          formState={formState}
          isTouched={isTouched}
          isFormSubmitted={isFormSubmitted}
          errors={errors}
          handleBlur={handleBlur}
          handleFieldChange={handleFieldChange} />

        <div>
          <FormControl
            label="repite password"
            name="repitePassword"
            type="password"
            placeholder="Repite el password"
            value={formState?.repitePassword}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            autoComplete="off"
          />
          <ErrorMessage
            fieldName={errors?.repitePassword}
            isFormSubmitted={isFormSubmitted}
            isTouched={isTouched?.repitePassword}
          />
        </div>

        <div style={{ display: 'flex' }}>
          <Button
            type="submit"
            backgroundColor="green"
          >
            Crear Cuenta
          </Button>

          <Link href='login' style={{ textAlign: 'center', lineHeight: 1, letterSpacing: "0px", fontSize:"1.2rem",marginTop:'1.7rem'  }} >
            Ya tienes cuenta?, Inicia sesión
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

export default CreateCLientPage