import { FormEvent, useState } from "react";
import { GetServerSideProps } from "next";

import { useEmployee , useUpdateEmployee} from "@/hooks/employee";
import { useForm } from "@/hooks/useForm";

import { Layout } from "@/components/layouts/app";
import { RegisterEmployOrClient } from "@/components/ui/services";
import { AlertSuccess, ApiMessageError, Button, ErrorMessage, FormControl, Select, Spinner } from "@/components/ui/client";

import { ROLES, formValidator, updateEmployeeValidationSchema } from "@/helpers";
import { getEmployeeById } from "@/api/employee/employee";

import { ErrorMessages, IClient, IEmployee, InitialForm, TypeRole, ErrorMessage as TypeError } from "@/types";
import { useUisStore } from "@/store/ui";

interface Props {
  employee: IEmployee
  employeeId: string
}

function UpdateEmployee({ employeeId, employee }: Props) {

  const employeeQuery = useEmployee(employeeId, employee);
  
  const {
    formState,
    handleBlur,
    handleFieldChange,
    handleResetForm,
    hasErrors,
    isFormSubmitted,
    isTouched
  } = useForm(employeeQuery.data)

  const [option, setOption] = useState<TypeRole[]>(formState?.role!);
  const setErrorApiMessage = useUisStore(state => state.setErrorMessage)

  const updateEmployee = useUpdateEmployee(employeeId)

  const errors = formValidator().getErrors(formState as InitialForm, updateEmployeeValidationSchema) 
  
  if (employeeQuery.isLoading) {
    return <Spinner />
  }
  const handleUpdateEmployee = (e: FormEvent) => {
    e.preventDefault();
    const notErrorsForms = hasErrors(errors as TypeError<IEmployee> | undefined)

    const newRoles = option.map(opt => {
      return opt
    }) as TypeRole[]

    if (newRoles.length === 0) {
      setErrorApiMessage(true, 'El usuario debe tener al menos 1 rol');
      setTimeout(() => setErrorApiMessage(false), 3000);
      return;
    }
    if (notErrorsForms) {

      const updatedEmployee = { ...formState, role: newRoles }
      updateEmployee.mutate(updatedEmployee as IEmployee);
    }
  }

  return (
    <Layout title={`${employeeQuery.data?.name} ${employeeQuery.data?.lastName}`} >

      <ApiMessageError />
      <AlertSuccess />

      <form className="form" onSubmit={handleUpdateEmployee} >

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
          options={ROLES || []}
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
            disabled={!!errors  || updateEmployee.isLoading}
          >
            {`${updateEmployee.isLoading ? 'Espere' : 'Actualiza Usuario'} `}
            
          </Button>
        </div>
      </form>
    </Layout>
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
