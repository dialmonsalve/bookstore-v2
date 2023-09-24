import { FormEvent, useState } from "react";
import { GetServerSideProps } from "next";

import { useEmployee, useUpdateEmployee } from "@/hooks/employee";
import { useForm } from "@/hooks/useForm";
import { useUisStore } from "@/store/ui";
import { useFormStore } from "@/store/form";

import { Layout } from "@/components/layouts/app";
import { CreateEditPerson } from "@/components/ui/services";
import { AlertSuccess, ApiMessageError, Button, Select, Spinner } from "@/components/ui/client";

import { formValidator } from "@/helpers";
import { getEmployeeById } from "@/api/employee/employee";
import { USER_VALIDATION_SCHEMA } from "@/constants";
import { IEmployee, TypeRole, } from "@/types";

interface Props {
  employee: IEmployee
  employeeId: string
}

function UpdateEmployeePage({ employeeId, employee }: Props) {

  const employeeQuery = useEmployee(employeeId, employee);
  const { handleFieldChange } = useForm(employeeQuery.data as Record<string, any>)

  const formState = useFormStore<IEmployee>(state => state.formState)
  const checkFormErrors = useFormStore(state => state.checkFormErrors)

  const setErrorApiMessage = useUisStore(state => state.setErrorMessage)

  const updateEmployee = useUpdateEmployee(employeeId);

  const errors = formValidator().getErrors(formState, USER_VALIDATION_SCHEMA.updateEmployee)
  const [option, setOption] = useState<TypeRole[]>(formState.role);

  const handleUpdateEmployee = (e: FormEvent) => {
    e.preventDefault();
    const hasFormErrors = checkFormErrors(errors)

    const newRoles = formState.role.map(opt => {
      return opt
    })

    if (newRoles.length === 0) {
      setErrorApiMessage(true, 'El usuario debe tener al menos 1 rol');
      setTimeout(() => setErrorApiMessage(false), 3000);
      return;
    }
    if (!hasFormErrors) {
      const updatedEmployee = { ...formState, role: newRoles }
      updateEmployee.mutate(updatedEmployee as IEmployee);
    }
  }

  return (
    <Layout title={`${employeeQuery.data?.name} ${employeeQuery.data?.lastName}`} >

      <ApiMessageError />
      <AlertSuccess />
      {updateEmployee.isLoading && <Spinner />}

      <form className="form" onSubmit={handleUpdateEmployee} >

        <CreateEditPerson
          handleFieldChange={handleFieldChange}
          errors={errors}
          isCreate={false}
          isEmployee
        />
        <div>

        </div>
        <Select
          options={USER_VALIDATION_SCHEMA.ROLES}
          value={option || formState.role}
          onChange={o => setOption(o)}
          name={'role'}
          multiple
        />

        <div style={{ display: 'flex' }}>
          <Button
            type='submit'
            backgroundColor='green'
            disabled={!!errors || updateEmployee.isLoading}
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

export default UpdateEmployeePage
