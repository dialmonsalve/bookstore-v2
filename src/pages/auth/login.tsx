import { FormEvent } from "react";
import { GetServerSideProps } from "next";

import Link from "next/link";
import { getSession } from "next-auth/react";

import { useLogin } from "@/hooks/auth";
import { useFormStore } from "@/store/form";

import { Layout } from "@/components/layouts/e-commerce";
import {
  Alert,
  Button,
  FormControl,
  LoginProvider,
  Spinner,
} from "@/components/ui";

import { LOGIN_CLIENT, LOGIN_VALIDATION_SCHEMA } from "@/constants";
import { formValidator } from "@/helpers";

function Login() {
  const loginClient = useLogin("email");
  const formState = useFormStore((state) => state.formState);
  const handleResetForm = useFormStore((state) => state.handleResetForm);
  const checkFormErrors = useFormStore((state) => state.checkFormErrors);

  const errors = formValidator().getErrors(
    formState,
    LOGIN_VALIDATION_SCHEMA.client
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const hasErrors = checkFormErrors(errors);

    if (!hasErrors) {
      handleResetForm(LOGIN_CLIENT.initialForm);
      loginClient.mutate({
        email: formState?.email,
        password: formState?.password,
      });
    }
  };

  if (loginClient.isLoading) return <Spinner />;

  return (
    <Layout
      title={"Ingresa y comienza a encontrar los libros que necesitas"}
      pageDescription={
        "Página para hacer login en diabooks. Permite a nuestros usuarios hacer sus compras e inscribirse a nuestros boletines"
      }
    >
      <h1>Entra y la magia comience iniciará</h1>

      <Alert />
      <form className="form" onSubmit={handleSubmit} noValidate>
        <FormControl
          errors={errors}
          formFields={LOGIN_CLIENT.formFields}
          classNameControl="form__control"
          classNameInput="form__input"
          classNameLabel="form__label"
          initialForm={LOGIN_CLIENT.initialForm}
        />
        <div className="container-button">
          <Button type="submit" backgroundColor="blue" disabled={!!errors}>
            Login
          </Button>

          <Link href="register" className="btn btn--green btn--medium">
            Crea tu cuenta
          </Link>
        </div>
      </form>
      <LoginProvider />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });

  const { p = "/" } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Login;
