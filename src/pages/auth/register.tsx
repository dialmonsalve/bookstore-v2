import { FormEvent } from "react";

import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import { useForm,  } from "@/hooks";

import { PublicLayout } from "@/components/layouts";
import { Spinner , RegisterForm} from "@/components/ui";

import { formValidator,  newClient,  newUserValidationSchema } from "@/helpers";
import { useRegisterCLient } from "@/hooks/auth";

function RegisterPage() {

  const {
    formState,
    isFormSubmitted,
    isTouched,
    handleBlur,
    handleFieldChange,
    areFieldsValid,
  } = useForm(newClient)

  const { registerCLient,  errorApiMessage, showError, setShowError,  } = useRegisterCLient();
  
  const errors = formValidator().getErrors(formState, newUserValidationSchema);

  const handleRegisterClient = async (e: FormEvent) => {
    e.preventDefault();
    setShowError(false);

    if (areFieldsValid(errors)) {
      const { repitePassword, ...restFormState } = formState;
      
      registerCLient.mutate({ repitePassword, ...restFormState })
    }
  }

  if (registerCLient.isLoading) {
    return <Spinner />
  }

  return (
    <PublicLayout
      title={'Crea tu cuenta y comienza a volar'}
      pageDescription={'Creación de cuenta en diaBbooks para comenzar a usar nuestros servicios'}
    >
      <h1 >Crea tu cuenta y comienza a volar</h1>

      <RegisterForm
        isEmployee={false}
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

export default RegisterPage