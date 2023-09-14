import { userApi } from "@/api";
import { getEmployees } from "@/api/employee";
import { PrivateLayout } from "@/components/layouts"
import { Button, Table, TableHeader, Td, Row, Spinner, AlertSuccess } from "@/components/ui"
import useEmployees from "@/hooks/employee/useEmployees";
import { IEmployee } from "@/types";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";


interface Props {
  employees: IEmployee[]
}

function UsersPage({ employees }: Props) {

  const router = useRouter();
  const queryEmployees = useEmployees(employees)

  const handleNavigate = (): void => {
    router.push('/admin/users/create')
  }

  const handleEditEmployee = (employeeId: string): void => {
    router.push(`/admin/users/${employeeId}`)
  }

  const handleDeleteEmployee = (id: string): void => {
    console.log(id);
  }


  if (queryEmployees.isLoading) {
    return <Spinner />
  }

  return (

    <PrivateLayout title="Usuarios" >
      <AlertSuccess />
      <Button
        buttonStyle="iconButton"
        ico="plus"
        top="25vh"
        position="fixed"
        right="3%"
        onClick={handleNavigate}
      />

      {
        queryEmployees?.data?.length === 0 ? <h2 className='h2'>Aún no hay usuarios</h2> :

          <Table>
            <TableHeader >
              <Td >Nombre</Td>
              <Td >Apellido</Td>
              <Td >Username</Td>
              <Td >email</Td>
              <Td >Teléfono</Td>
              <Td >rol</Td>
              <Td colSpan={2} textAlign='center' >Actions</Td>
            </TableHeader>
            <tbody>
              {
                queryEmployees?.data?.map(user => (
                  <Row key={user._id} >
                    <Td  >{user.name}</Td>
                    <Td  >{user.lastName}</Td>
                    <Td  >{`${user.username}`}</Td>
                    <Td  >{`${user.email}`}</Td>
                    <Td  >{`${user.phone}`}</Td>
                    <Td  >{`${user.role}`}</Td>
                    <Td  ><Button
                      size='small'
                      backgroundColor='outline-blue'
                      onClick={() => handleEditEmployee(user._id!)}
                    >editar</Button> </Td>
                    <Td  ><Button
                      size='small'
                      backgroundColor='outline-red'
                      onClick={() => handleDeleteEmployee(user._id!)}
                    >eliminar</Button> </Td>
                  </Row>
                ))
              }
            </tbody>
          </Table>
      }

    </PrivateLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

  const session = await getSession({ req })

  const employees = await getEmployees()

  if (session) {
    return {
      props: {
        employees
      }
    }

  }
  return {
    props: {}
  }

}

export default UsersPage;