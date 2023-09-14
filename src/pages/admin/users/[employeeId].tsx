import { userApi } from "@/api";
import { getEmployeeById } from "@/api/employee";
import { PrivateLayout } from "@/components/layouts"
import { Button, ErrorMessage, FormControl, RegisterEmployOrClient, Select, Spinner, selectOption } from "@/components/ui";
import { formValidator, updateEmployeeValidationSchema } from "@/helpers";
import { useEmployee } from "@/hooks/employee/useEmployees";
import { useForm } from "@/hooks/useForm";
import { ErrorMessages, IClient, IEmployee, InitialForm } from "@/types";
import { GetServerSideProps } from "next";
import { useState } from "react";

interface Props {
  employee: IEmployee
  employeeId: string
}

const oldRoles = [
  { label: 'logistica', value: 1 },
  { label: 'ventas', value: 2 },
  { label: 'compras', value: 3 },
]


function UpdateEmployee({ employeeId, employee }: Props) {


  const employeeQuery = useEmployee(employeeId, employee)
  const {
    formState,
    handleBlur,
    handleFieldChange,
    handleResetForm,
    hasErrors,
    isFormSubmitted,
    isTouched
  } = useForm(employeeQuery.data)

  const roles = formState?.role?.map((rol, idx) => {

    const newrol = {
      label: rol,
      value: idx + 1
    }
    console.log(newrol);
    
    return newrol
  })

  console.log(roles);
  

  const [option, setOption] = useState<selectOption[]>([...roles!])

  const errors = formValidator().getErrors(formState as InitialForm, updateEmployeeValidationSchema)

  if (employeeQuery.isLoading) {
    return <Spinner />
  }

  return (
    <PrivateLayout title={`${employeeQuery.data?.name} ${employeeQuery.data?.lastName}`} >

      <form className="form" action="PUT">

        <RegisterEmployOrClient
          formState={formState}
          handleBlur={handleBlur}
          handleFieldChange={handleFieldChange}
          isFormSubmitted={isFormSubmitted}
          isTouched={isTouched}
          errors={errors as ErrorMessages<IEmployee | IClient>}
          isCreate={false}
        />
        <div>
          <FormControl
            label='Username'
            name='username'
            type='text'
            placeholder='Username'
            value={formState?.username}
            onChange={handleFieldChange}
            onBlur={handleBlur}
          />
        </div>
        <Select
          options={oldRoles || []}
          value={option}
          onChange={o => setOption(o)}
          name={'role'}
          multiple
        />
        <ErrorMessage
          fieldName={errors?.role}
          isFormSubmitted={isFormSubmitted}
          isTouched={isTouched?.role}
        />

        <div style={{ display: 'flex' }}>
          <Button
            type='submit'
            backgroundColor='green'
            disabled={!!errors}
          >
            Actualiza Usuario
          </Button>
        </div>
      </form>


    </PrivateLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const { employeeId } = params as { employeeId: string }

  const employee = await getEmployeeById(employeeId)

  return {
    props: {
      employeeId,
      employee
    }
  }
}

export default UpdateEmployee
