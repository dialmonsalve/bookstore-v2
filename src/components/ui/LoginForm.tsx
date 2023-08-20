import Link from "next/link"
import { Button, ErrorMessage, FormControl } from "."
import { FormEvent } from "react";
import { ErrorMessages, InitialForm, IsTouched, ReactChangeEvent, ReactFocusEvent } from "@/types";
import { login } from "@/helpers";

interface Props {
  errors: ErrorMessages<InitialForm> | undefined
  formState: InitialForm;
  isFormSubmitted: boolean
  isTouched: IsTouched;
  handleBlur: (e: ReactFocusEvent) => void
  handleFieldChange: (e: ReactChangeEvent) => void
  onSubmit: (e: FormEvent) => void
}

export const LoginForm = ({ 
  errors,
  formState, 
  isFormSubmitted,
  isTouched,
  handleBlur, 
  handleFieldChange,
  onSubmit, 
}: Props) => {

  const { email, password } = formState;

  return (
    <form style={{ width: "50rem" }} className="form" onSubmit={onSubmit}  >
      <ErrorMessage
        fieldName={errors?.email}
        isFormSubmitted={isFormSubmitted}
        isTouched={isTouched?.email}
      />
      <FormControl
        label="email"
        name="email"
        type="email"
        placeholder="Your email"
        value={email}
        onChange={handleFieldChange}
        onBlur={handleBlur}
      />
      <ErrorMessage
        fieldName={errors?.password}
        isFormSubmitted={isFormSubmitted}
        isTouched={isTouched?.password}
      />

      <FormControl
        label="password"
        name="password"
        type="password"
        placeholder="Your password"
        value={password}
        onChange={handleFieldChange}
        onBlur={handleBlur}
      />
      <div style={{ display: 'flex' }}>
        <Button type="submit" width='40%' backgroundColor="blue" disabled={!!errors}  >
          Login
        </Button>

        <Link href='create-account' className="btn btn--green btn--medium" >
          Create account
        </Link>
      </div>
    </form>
  )
}
