import { IEmployee } from "@/types"
import { Button, Row, Spinner, Table, TableHeader, Td } from "../client"
import { useEmployees } from "@/hooks/employee"
import { Paginator } from "../client/Paginator"

interface Props {
  handleEditEmployee: (employeeId: string) => void
  handleDeleteEmployee: (employeeId: string, username: string) => void
}

export const TableEmployees = ({ handleEditEmployee, handleDeleteEmployee }: Props) => {

  const queryEmployees = useEmployees()

  if (queryEmployees.isLoading) return <Spinner />

  return (

    queryEmployees?.data?.totalEmployees === 0 ?

      <h2 style={{ textAlign: 'center', fontSize: '3rem' }} >Aún  No hay usuarios</h2>
      :
      <>
        <Table>
          <TableHeader >
            <Td >Nombre</Td>
            <Td >Apellido</Td>
            <Td >Username</Td>
            <Td >email</Td>
            <Td >Teléfono</Td>
            <Td >role</Td>
            <Td colSpan={2} textAlign='center' >Actions</Td>
          </TableHeader>
          <tbody>
            {
              queryEmployees?.data?.employees?.map(user => {
                return (
                  <Row key={user._id}>
                    <Td>{user.name}</Td>
                    <Td>{user.lastName}</Td>
                    <Td>{`${user.username}`}</Td>
                    <Td>{`${user.email}`}</Td>
                    <Td>{`${user.phone}`}</Td>
                    <Td>{`${user.role}`}</Td>

                    {!user.role?.includes("admin") ?
                      <>
                        <Td textAlign="center" >
                        <Button
                          buttonStyle="iconButton"
                          ico="edit"
                          onClick={() => handleEditEmployee(user._id!)}
                        />Edit
                          {/* <Button
                          size='small'
                          backgroundColor='outline-blue'
                          onClick={() => handleEditEmployee(user._id!)}
                        >editar</Button> */}
                        </Td>

                        <Td >
                          {/* <Button
                          size='small'
                          backgroundColor='outline-red'
                          onClick={() => handleDeleteEmployee(user._id!, user.username)}
                        >eliminar</Button> */}
                        <Button
                          buttonStyle="iconButton"
                          ico="trash"
                          onClick={() => handleDeleteEmployee(user._id!, user.username)}
                        />Del
                        </Td>
                      </>
                      : <><Td></Td><Td></Td></>}

                  </Row>
                )
              })
            }
          </tbody>

        </Table>

        <Paginator />
      </>
  )
}