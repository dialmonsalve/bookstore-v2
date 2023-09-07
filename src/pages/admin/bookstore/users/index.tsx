import { PrivateLayout } from "@/components/layouts"
import { Button, Spinner, Table, TableHeader, Td, Row } from "@/components/ui"

import { useStaff } from "@/hooks/staff/useStaff";
import { useEmployeesStore } from "@/store/users";

import { useRouter } from "next/router";

function UsersPage() {

  const router = useRouter();
  const { isLoading } = useStaff();

  const employees = useEmployeesStore(state => state.employees);

  if (isLoading) {
    return <Spinner />
  }

  const handleNavigate =(): void =>{
    router.push('/admin/bookstore/users/create')
  }

  const handleEditStaff =(id: string): void =>{
    console.log(id);

  }

  const handleDeleteStaff =(id: string): void =>{
    console.log(id);
  }

  return (


    <PrivateLayout title="Usuarios" >
      <Button
        buttonStyle="iconButton"
        ico="plus"
        top="25vh"
        position="fixed"
        right="2%"
        onClick={handleNavigate}
      />
      
      {
        !employees ? <h2 className='h2'>Aún no hay usuarios</h2> :


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
                employees.map(user => (
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
                      onClick={() => handleEditStaff(user._id!)}
                    >editar</Button> </Td>
                    <Td  ><Button
                      size='small'
                      backgroundColor='outline-red'
                      onClick={() => handleDeleteStaff(user._id!)}
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

export default UsersPage;