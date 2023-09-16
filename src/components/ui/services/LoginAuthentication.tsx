
import { ErrorMessages, InitialForm, IsTouched, ReactChangeEvent, ReactFocusEvent } from "@/types"
import {ErrorMessage , FormControl } from "../client"

interface Props {
  isEmployee: boolean
  formState: InitialForm
  isTouched: IsTouched
  isFormSubmitted: boolean
  errors: ErrorMessages<InitialForm> | undefined 
  handleBlur: (e: ReactFocusEvent) => void
  handleFieldChange: (e: ReactChangeEvent) => void
}

export const LoginAuthentication = ({ 
  isEmployee, 
  formState,
  isTouched,
  isFormSubmitted,
  handleBlur,
  handleFieldChange,
  errors ,
}: Props) => {

  const {username,email , password} = formState


  return (
    <>
      {
        isEmployee ?
          <div>
            <FormControl
              label={'username'}
              name="username"
              type="email"
              placeholder="username"
              value={username}
              onChange={handleFieldChange}
              onBlur={handleBlur}
            />
            <ErrorMessage
              fieldName={errors?.username}
              isFormSubmitted={isFormSubmitted}
              isTouched={isTouched?.username}
            />
          </div>

          : <div>
            <FormControl
              label={'email'}
              name="email"
              type="email"
              placeholder="Tu email"
              value={email}
              onChange={handleFieldChange}
              onBlur={handleBlur}
            />
            <ErrorMessage
              fieldName={errors?.email}
              isFormSubmitted={isFormSubmitted}
              isTouched={isTouched?.email}
            />
          </div>
      }
      <div>
        <FormControl
          label="password"
          name="password"
          type="password"
          placeholder="Tu password"
          value={password}
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
