import { ErrorMessages, InitialForm, IsTouched, ReactChangeEvent, ReactFocusEvent } from "@/types"
import {   ErrorMessage, FormControl,  } from "./"

interface Props {
  isEmployee: boolean
  formState: InitialForm
  isTouched: IsTouched
  isFormSubmitted: boolean
  errors: ErrorMessages<InitialForm> | undefined 
  handleBlur: (e: ReactFocusEvent) => void
  handleFieldChange: (e: ReactChangeEvent) => void
}


export const RegisterEmploy = ({
errors,
formState, 
handleBlur, 
handleFieldChange,
isEmployee, 
isFormSubmitted, 
isTouched
}:Props) => {
  const { } = formState

  return (
    <>
      <div >
        <FormControl
          label="nombre"
          name="name"
          type="text"
          placeholder="Nombre"
          value={formState?.name}
          onChange={handleFieldChange}
          onBlur={handleBlur}

        />
        <ErrorMessage
          fieldName={errors?.name}
          isFormSubmitted={isFormSubmitted}
          isTouched={isTouched?.name}
        />

      </div>

      <div>
        <FormControl
          label="apellido"
          name="lastName"
          type="text"
          placeholder="Apellido"
          value={formState?.lastName}
          onChange={handleFieldChange}
          onBlur={handleBlur}
        />
        <ErrorMessage
          fieldName={errors?.lastName}
          isFormSubmitted={isFormSubmitted}
          isTouched={isTouched?.lastName}
        />
      </div>

      <div>
        <FormControl
          label="email"
          name="email"
          type="email"
          placeholder="Email"
          value={formState?.email}
          onChange={handleFieldChange}
          onBlur={handleBlur}
        />
        <ErrorMessage
          fieldName={errors?.email}
          isFormSubmitted={isFormSubmitted}
          isTouched={isTouched?.email}
        />
      </div>

      <div>
        <FormControl
          label="Teléfono"
          name="phone"
          type="phone"
          placeholder="Teléfono"
          value={formState?.phone}
          onChange={handleFieldChange}
          onBlur={handleBlur}
        />
        <ErrorMessage
          fieldName={errors?.phone}
          isFormSubmitted={isFormSubmitted}
          isTouched={isTouched?.phone}
        />
      </div>

      <div>
        <FormControl
          label="password"
          name="password"
          type="password"
          placeholder="Password"
          value={formState?.password}
          onChange={handleFieldChange}
          onBlur={handleBlur}
          autoComplete="off"
        />

        <ErrorMessage
          fieldName={errors?.password}
          isFormSubmitted={isFormSubmitted}
          isTouched={isTouched?.password}
        />
      </div>
    </>
  )
}
