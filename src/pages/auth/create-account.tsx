import { FormEvent } from "react"
import { PublicLayout } from "@/components/layouts"
import { Button, FormControl, ErrorMessage } from "@/components/ui"
import { useForm } from "@/hooks/useForm";
import Link from "next/link";
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
    <PublicLayout title={'contact us'} pageDescription={'Find your dreams books here'}>
      <h1 style={{ marginBottom: '6rem' }} >Create your account and fly</h1>

      <form style={{ width: "60rem" }} className="form" onSubmit={handleSubmit} >
        <ErrorMessage
          fieldName={errors?.name}
          isFormSubmitted={isFormSubmitted}
          isTouched={isTouched?.name}
        />
        <FormControl
          label="name"
          name="name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={handleFieldChange}
          onBlur={handleBlur}
        />
        <ErrorMessage
          fieldName={errors?.lastName}
          isFormSubmitted={isFormSubmitted}
          isTouched={isTouched?.lastName}
        />
        <FormControl
          label="last Name"
          name="lastName"
          type="text"
          placeholder="Your last name"
          value={lastName}
          onChange={handleFieldChange}
          onBlur={handleBlur}
        />
        <ErrorMessage
          fieldName={errors?.email}
          isFormSubmitted={isFormSubmitted}
          isTouched={isTouched?.email}
        />
        <FormControl
          label="email"
          name="email"
          type="email"
          placeholder="your email"
          value={email}
          onChange={handleFieldChange}
          onBlur={handleBlur}
        />
        <ErrorMessage
          fieldName={errors?.phone}
          isFormSubmitted={isFormSubmitted}
          isTouched={isTouched?.phone}
        />
        <FormControl
          label="phone"
          name="phone"
          type="phone"
          placeholder="your phone"
          value={phone}
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
          placeholder="your password"
          value={password}
          onChange={handleFieldChange}
          onBlur={handleBlur}
        />
        <ErrorMessage
          fieldName={errors?.repitePassword}
          isFormSubmitted={isFormSubmitted}
          isTouched={isTouched?.repitePassword}
        />
        <FormControl
          label="repite password"
          name="repitePassword"
          type="password"
          placeholder="Repite your password"
          value={repitePassword}
          onChange={handleFieldChange}
          onBlur={handleBlur}
        />

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