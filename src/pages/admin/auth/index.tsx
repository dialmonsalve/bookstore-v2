import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import { Alert, Spinner } from "@/components/ui";
import { LoginEmployee } from "@/components/views/user/LoginEmployee";
import { useLogin } from "@/plugins/dependencies";

function PrivateLoginPage() {
  const loginEmployee = useLogin("username");

  return (
    <main className="admin-login">
      {loginEmployee.isLoading && <Spinner />}
      <h1 style={{ color: "white" }}>Login</h1>
      <Alert />
      <LoginEmployee />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });

  const { p = "/bookstore" } = query;

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

export default PrivateLoginPage;
