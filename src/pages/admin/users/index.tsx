import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

import { useEmployees } from "@/hooks/employee";

import { Layout } from "@/components/layouts/app";
import { AlertSuccess, ApiMessageError, Button, Row, Spinner, Table, TableHeader, Td } from "@/components/ui/client";

import { getEmployees } from "@/api/employee/employee";
import { IEmployee } from "@/types";
import useDeleteEmployee from "@/hooks/employee/useDeleteEmployee";
import { useUisStore } from "@/store/ui";
import { Modal } from "@/components/ui/client/Modal";
import { useState } from "react";
import { Paginator } from "@/components/ui/client/Paginator";

interface Props {
  employees: IEmployee[]
}

function UsersPage({ employees }: Props) {

  const [employeeId, setEmployeeId] = useState("");
  const router = useRouter();

  const { queryEmployees } = useEmployees(employees);
  const deleteEmployee = useDeleteEmployee();
  const setShowModal = useUisStore(state => state.setShowModal);

  const handleCreateEmployee = (): void => {
    router.push('/admin/users/create')
  }

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

  if (queryEmployees.isLoading) {
    return <Spinner />
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
          top="25vh"
          position="fixed"
          right="3%"
          onClick={handleCreateEmployee}
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

                      {
                        !user.role?.includes("admin") ?
                          <>
                            <Td  ><Button
                              size='small'
                              backgroundColor='outline-blue'
                              onClick={() => handleEditEmployee(user._id!)}
                            >editar</Button>
                            </Td>

                            <Td  ><Button
                              size='small'
                              backgroundColor='outline-red'
                              onClick={() => handleDeleteEmployee(user._id!, user.username)}
                            >eliminar</Button>
                            </Td>
                          </>
                          : <><Td></Td><Td></Td></>
                      }

                    </Row>
                  ))
                }
              </tbody>
            </Table>
        }

        <Paginator
          employees={employees}
        />

      </Layout>
    </>

  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

  const session = await getSession({ req })

  const employees = await getEmployees(Number(query.page))

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