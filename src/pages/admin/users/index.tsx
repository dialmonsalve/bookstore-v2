import { useRouter } from "next/router";

import { Layout } from "@/components/layouts/app";
import { AlertSuccess, ApiMessageError, Button} from "@/components/ui/client";

import useDeleteEmployee from "@/hooks/employee/useDeleteEmployee";
import { useUisStore } from "@/store/ui";
import { Modal } from "@/components/ui/client/Modal";
import { useState } from "react";
import { TableEmployees } from "@/components/ui/services/TableEmployees";

function UsersPage() {

  const [employeeId, setEmployeeId] = useState("");
  const router = useRouter();

  const deleteEmployee = useDeleteEmployee();
  const setShowModal = useUisStore(state => state.setShowModal);

  const handleEditEmployee = (employeeId: string): void => {
    router.push(`/admin/users/${employeeId}`)
  }

  const handleDeleteEmployee = (employeeId: string, employeeUsername: string): void => {
    setShowModal(true, `¿Desea eliminar el usuario ${employeeUsername}?`)
    setEmployeeId(employeeId)
  }

  const handleAcceptAction = () => {
    setShowModal(false)
    deleteEmployee.mutate(employeeId);
  }

  return (

    <>
      <Modal typeModal="warning" >
        <Button backgroundColor="red" onClick={handleAcceptAction} >
          ¿Está seguro?
        </Button>
      </Modal>

      <Layout title="Usuarios" >
        <ApiMessageError />
        <AlertSuccess />
        <Button
          buttonStyle="iconButton"
          ico="plus"
          top="26vh"
          position="fixed"
          right="3%"
          onClick={()=>router.push('/admin/users/create')}
        />
        <TableEmployees
          handleDeleteEmployee={handleDeleteEmployee}
          handleEditEmployee={handleEditEmployee}
        />
        
      </Layout>
    </>

  )
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