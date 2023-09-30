import { useState } from "react";
import { useRouter } from "next/router";

import { useUisStore } from "@/store/ui";

import useDeleteEmployee from "@/hooks/employee/useDeleteEmployee";
import { useEmployees } from "@/hooks/employee";

import { Layout } from "@/components/layouts/app";
import {
  Alert,
  Button,
  Modal,
  Paginator,
  Spinner,
  Table,
} from "@/components/ui/client";

const titles = ["Nombre", "Apellido", "Username", "email", "Teléfono", "Role"];

const nameTableFields = [
  "name",
  "lastName",
  "username",
  "email",
  "phone",
  "role",
];

function UsersPage() {
  //! Sates
  const [employeeId, setEmployeeId] = useState("");
  const router = useRouter();
  const deleteEmployee = useDeleteEmployee();
  const setShowModal = useUisStore((state) => state.setShowModal);
  const { data, isLoading } = useEmployees();

  //! Handler functions
  const handleEditEmployee = (employeeId: string | number): void => {
    router.push(`/admin/users/${employeeId}`);
  };

  const handleDeleteEmployee = (
    employeeId: string | number,
    employeeUsername?: string | number
  ): void => {
    setShowModal(true, `¿Desea eliminar el usuario ${employeeUsername}?`);
    setEmployeeId(`${employeeId}`);
  };

  const handleAcceptAction = () => {
    setShowModal(false);
    deleteEmployee.mutate(employeeId);
  };

  // ! Constants
  if (isLoading) return <Spinner />;

  if (!data) return;

  return (
    <>
      <Modal typeModal="warning">
        <Button backgroundColor="red" onClick={handleAcceptAction}>
          ¿Está seguro?
        </Button>
      </Modal>

      <Layout title="Usuarios">
        <Alert />
        <Button
          buttonStyle="iconButton"
          ico="plus"
          top="14vh"
          position="absolute"
          right="20%"
          onClick={() => router.push("/admin/users/create")}
        />
        {data.totalEmployees === 0 ? (
          <h2 style={{ textAlign: "center", fontSize: "3rem" }}>
            Aún No hay usuarios
          </h2>
        ) : (
          <>
            <Table
              tableTitles={titles}
              nameTableFields={nameTableFields}
              data={data.employees}
              handleDelete={handleDeleteEmployee}
              handleEdit={handleEditEmployee}
              isEditable
            />
            <Paginator />
          </>
        )}
      </Layout>
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async ({ req, query, params }) => {

//   const session = await getSession({ req })

//   // const {page} = params

//   console.log(params);

//   const employees = await getEmployees(Number(page))

//   if (session) {
//     return {
//       props: {
//         employees
//       }
//     }

//   }
//   return {
//     props: {employees}
//   }

// }

export default UsersPage;
