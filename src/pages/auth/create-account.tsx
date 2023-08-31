import { FormEvent } from "react";
import Link from "next/link";

import { useForm } from "@/hooks";

import { PublicLayout } from "@/components/layouts";
import { Button, FormControl, ErrorMessage } from "@/components/ui";

import { formValidator, newUser, newUserValidationSchema } from "@/helpers";

function CreateAccount() {

  const {
    formState,
    isFormSubmitted,
    isTouched,
    handleBlur,
    handleFieldChange,
    areFieldsValid,
    handleResetForm
  } = useForm(newUser)

  const { email, lastName, name, password, phone, repitePassword } = formState;

  const errors = formValidator().getErrors(formState, newUserValidationSchema);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (areFieldsValid(errors)) {
      console.log({ formState });

      // TODO implement validation vs backend

      handleResetForm()
    }
  }
  return (
    <PublicLayout
      title={'Create tu cuenta y comienza a volar'}
      pageDescription={'Creación de cuenta en diaBbooks para comenzar a usar nuestros servicios'}
    >
      <h1 >Create tu cuenta y comienza a volar</h1>

      <form style={{ width: "60rem" }} className="form" onSubmit={handleSubmit} >

        <div>
          <FormControl
            label="nombre"
            name="name"
            type="text"
            placeholder="Tu nombre"
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
            placeholder="Tu apellido"
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
            label="Teléfono"
            name="phone"
            type="phone"
            placeholder="tu Teléfono"
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

        <div>
          <FormControl
            label="repite password"
            name="repitePassword"
            type="password"
            placeholder="Repite tu password"
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

        <div style={{ display: 'flex' }}>
          <Button type="submit" width='40%' backgroundColor="green" disabled={!!errors} >
            Create account
          </Button>

          <Link href='login' className="btn btn--blue btn--medium" >
            Login
          </Link>
        </div>
      </form>

    </PublicLayout>
  )
}

export default CreateAccount