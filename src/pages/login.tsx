import { FormEvent } from "react";
import Link from "next/link";
import { useForm } from "@/hooks/useForm";

import { PublicLayout } from "@/components/layouts"
import { Button, FormControl, Form, ErrorMessage } from "@/components/ui"
import { login,loginValidationSchema, formValidator } from "@/helpers";


function Login() {

  const {
    formState,
    isFormSubmitted,
    isTouched,
    handleFieldChange,
    handleBlur,
    areFieldsValid
  } = useForm(login);

  const { email, password } = formState;

  const errors = formValidator().getErrors(formState, loginValidationSchema);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (areFieldsValid(errors)) {
      console.log({ email, password });
    }

  }
  return (
    <PublicLayout title={'login'} pageDescription={'Find your dreams books here'}>
      <h1 style={{ marginBottom: '6rem' }} >Enter and the magic begins</h1>

      <Form onSubmit={handleSubmit} width="50rem" >
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
          <Button type="submit" width='40%' backgroundColor="blue"  >
            Login
          </Button>

          <Link href='create-account' className="btn btn--green btn--medium" >
            Create account
          </Link>
        </div>
      </Form>

    </PublicLayout>
  )
}

export default Login