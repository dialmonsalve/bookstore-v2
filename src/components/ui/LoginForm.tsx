import Link from "next/link"
import { Button, ErrorMessage, FormControl } from "."
import { FormEvent } from "react";
import { ErrorMessages, InitialForm, IsTouched, ReactChangeEvent, ReactFocusEvent } from "@/types";


interface Props {
  errors: ErrorMessages<InitialForm> | undefined;
  formState: InitialForm;
  isFormSubmitted: boolean;
  isTouched: IsTouched;
  isStaff?: boolean
  handleBlur: (e: ReactFocusEvent) => void;
  handleFieldChange: (e: ReactChangeEvent) => void;
  onSubmit: (e: FormEvent) => void;

}

export const LoginForm = ({
  errors,
  formState,
  isFormSubmitted,
  isTouched,
  isStaff = false,
  handleBlur,
  handleFieldChange,
  onSubmit,
}: Props) => {

  const { email, password } = formState;

  return (
    <form className="form" onSubmit={onSubmit} noValidate >
      <div>
      <FormControl
        label="email"
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

      <div>
      <FormControl
        label="password"
        name="password"
        type="password"
        placeholder="Tu password"
        value={password}
        onChange={handleFieldChange}
        onBlur={handleBlur}
      />
      <ErrorMessage
        fieldName={errors?.password}
        isFormSubmitted={isFormSubmitted}
        isTouched={isTouched?.password}
      />
      </div>

      <div className="form__buttons">
        <Button type="submit" width='40%' backgroundColor="blue" disabled={!!errors}  >
          Login
        </Button>
        {
          !isStaff &&
          <Link href='create-account' className="btn btn--green btn--medium" >
            Create account
          </Link>
        }

      </div>
    </form>
  )
}
