import { FormEvent } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";

import { UseLoginClient } from "@/hooks/auth";
import { useFormStore } from "@/store/form";

import { CreateEditPerson } from "@/components/views";
import { Layout } from "@/components/layouts/e-commerce";
import { Alert, Button } from "@/components/ui";

import { formValidator } from "@/helpers";
import { USER_VALIDATION_SCHEMA } from "@/constants";
import { IClient } from "@/types";

const newClient = {
  name: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  repitePassword: "",
};

function CreateCLientPage() {
  const formState = useFormStore<IClient>((state) => state.formState);
  const checkFormErrors = useFormStore((state) => state.checkFormErrors);
  const errors = formValidator().getErrors(
    formState,
    USER_VALIDATION_SCHEMA.newClient
  );
  const registerClient = UseLoginClient();

  const handleRegisterClient = async (e: FormEvent) => {
    e.preventDefault();

    const hasFormErrors = checkFormErrors(errors);

    if (!hasFormErrors) {
      const { repitePassword, ...restFormState } = formState;
      registerClient.mutate(restFormState);
    }
  };

  return (
    <Layout
      title={"Crea tu cuenta y comienza a volar"}
      pageDescription={
        "Creación de cuenta en diaBbooks para comenzar a usar nuestros servicios"
      }
    >
      <h1>Crea tu cuenta y comienza a volar</h1>

      <Alert />
      <form
        method="POST"
        style={{ width: "50rem" }}
        className="form"
        onSubmit={handleRegisterClient}
      >
        <CreateEditPerson
          initialForm={newClient}
          errors={errors}
          isCreate
          isEmployee={false}
        />

        <div className="container-button">
          <Button type="submit" backgroundColor="green">
            Crear Cuenta
          </Button>

          <Link
            href="login"
            style={{
              textAlign: "center",
              lineHeight: 1,
              letterSpacing: "0px",
              fontSize: "1.2rem",
              marginTop: "1.7rem",
            }}
          >
            Ya tienes cuenta?, Inicia sesión
          </Link>
        </div>
      </form>
    </Layout>
  );
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