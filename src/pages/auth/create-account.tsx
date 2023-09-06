import { FormEvent } from "react";

import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import { useForm,  } from "@/hooks";

import { PublicLayout } from "@/components/layouts";
import { Spinner , RegisterForm} from "@/components/ui";

import { formValidator,  newUserValidationSchema } from "@/helpers";
import { useLoginOrRegistry } from "@/hooks/auth";

export const newClient = {
  name: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  repitePassword: ''
};

function CreateAccount() {

  const {
    formState,
    isFormSubmitted,
    isTouched,
    handleBlur,
    handleFieldChange,
    areFieldsValid,
    handleResetForm
  } = useForm(newClient)

  const { registerUser,  errorApiMessage, showError, setShowError,  } = useLoginOrRegistry("email");

  
  const errors = formValidator().getErrors(formState, newUserValidationSchema);

  const handleRegisterClient = async (e: FormEvent) => {
    e.preventDefault();
    setShowError(false);

    if (areFieldsValid(errors)) {
      const { repitePassword, ...restFormState } = formState
      registerUser.mutate({ repitePassword, ...restFormState })
    }
  }

  if (registerUser.isLoading) {
    return <Spinner />
  }

  return (
    <PublicLayout
      title={'Crea tu cuenta y comienza a volar'}
      pageDescription={'Creación de cuenta en diaBbooks para comenzar a usar nuestros servicios'}
    >
      <h1 >Crea tu cuenta y comienza a volar</h1>

      <RegisterForm
        isStaff={false}
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

export default CreateAccount