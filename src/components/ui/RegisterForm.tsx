import Link from "next/link"
import { ApiMessageError, Button, ErrorMessage, FormControl } from "./"
import { ErrorMessages, InitialForm, IsTouched, ReactChangeEvent, ReactFocusEvent } from "@/types";
import { FormEvent } from "react";

interface Props {
  errorApiMessage: string,
  errors: ErrorMessages<InitialForm> | undefined;
  formState: InitialForm;
  isFormSubmitted: boolean;
  isStaff: boolean
  isTouched: IsTouched;
  showError: boolean,
  handleBlur: (e: ReactFocusEvent) => void;
  handleFieldChange: (e: ReactChangeEvent) => void;
  onSubmit: (e: FormEvent) => void;
}

export const RegisterForm = ({
  errorApiMessage,
  errors,
  formState,
  isStaff,
  isFormSubmitted,
  isTouched,
  showError,
  handleBlur,
  handleFieldChange,
  onSubmit,
}: Props) => {

  const {
    email,
    lastName,
    name,
    password,
    phone,
    repitePassword,
    username
  } = formState;

  return (
    <>
      <ApiMessageError
        showError={showError}
        errorApiMessage={errorApiMessage}
      />
      <form style={{ width: "60rem" }} className="form" onSubmit={onSubmit} >

        <div>
          <FormControl
            label="nombre"
            name="name"
            type="text"
            placeholder="Nombre"
            value={name}
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
            value={lastName}
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
            label="Teléfono"
            name="phone"
            type="phone"
            placeholder="Teléfono"
            value={phone}
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
        {
          isStaff
            ? <div>
              <FormControl
                label="Username"
                name="username"
                type="text"
                placeholder="Username"
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
            :
            <div>
              <FormControl
                label="repite password"
                name="repitePassword"
                type="password"
                placeholder="Repite el password"
                value={repitePassword}
                onChange={handleFieldChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                fieldName={errors?.repitePassword}
                isFormSubmitted={isFormSubmitted}
                isTouched={isTouched?.repitePassword}
              />
            </div>
        }
        <div style={{ display: 'flex' }}>
          <Button type="submit" width='40%' backgroundColor="green" disabled={!!errors} >
            Crear Cuenta
          </Button>
          {
            !isStaff &&
            <Link href='login' className="btn btn--blue btn--medium" style={{ textAlign: 'center', lineHeight: 1, letterSpacing: 0 }} >
              Ya tienes cuenta?, Inicia sesión
            </Link>
          }

        </div>
      </form>
    </>
  )
}
