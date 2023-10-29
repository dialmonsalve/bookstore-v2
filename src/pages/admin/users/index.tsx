import { Layout } from "@/components/layouts/app";
import {
  Alert,
  Button,
  Modal,
  Paginator,
  Spinner,
  Table,
} from "@/components/ui";
import { useMainEmployees } from "@/hooks/useMainEmployees";

function UsersPage() {
  const {
    employeeGetAll,
    nameTableFields,
    router,
    titles,
    handleAcceptAction,
    handleDeleteEmployee,
    handleEditEmployee,
  } = useMainEmployees();

  return (
    <>
      {employeeGetAll.IsEmployeeLoading && <Spinner />}
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
        {employeeGetAll?.totalEmployees === 0 ? (
          <h2 style={{ textAlign: "center", fontSize: "3rem" }}>
            Aún No hay usuarios
          </h2>
        ) : (
          <>
            <Table
              tableTitles={titles}
              nameTableFields={nameTableFields}
              data={employeeGetAll?.getAll}
              handleDelete={handleDeleteEmployee}
              handleEdit={handleEditEmployee}
              isEditable
            />
            <Paginator
              totalData={employeeGetAll?.totalEmployees || 0}
              query={employeeGetAll}
            />
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
