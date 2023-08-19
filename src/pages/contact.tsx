import { PublicLayout } from "@/components/layouts"
import { Button, FormControl, Form, ErrorMessage } from "@/components/ui"
import { formValidator, newMessage, newMessageValidationSchema } from "@/helpers";
import { useForm } from "@/hooks/useForm";

import { FormEvent } from "react"

function Contact() {

  const {
    formState,
    isFormSubmitted,
    isTouched,
    handleBlur,
    handleFieldChange,
    areFieldsValid,
    handleResetForm
  } = useForm(newMessage)

  const { email, lastName, name, phone, message } = formState;

  const errors = formValidator().getErrors(formState, newMessageValidationSchema);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (areFieldsValid(errors)) {
      console.log({ formState });

      handleResetForm()
    }
  }
  return (
    <PublicLayout title={'contact us'} pageDescription={'Find your dreams books here'}>
      <h1 style={{ marginBottom: '6rem' }}  >Tell us what you want</h1>

      <Form onSubmit={handleSubmit} width="50rem" >
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
        />
        <ErrorMessage
          fieldName={errors?.message}
          isFormSubmitted={isFormSubmitted}
          isTouched={isTouched?.message}
        />
        <textarea
          className="text-area"
          placeholder="Enter text"
          style={{ height: '10rem', marginTop:'1rem' }}
          name="message"
          value={message}
          onChange={handleFieldChange}
          onBlur={handleBlur}
        />

        <Button type="submit" width='50%' backgroundColor="blue" disabled={!!errors} >
          send
        </Button>
      </Form>

    </PublicLayout>
  )
}

export default Contact