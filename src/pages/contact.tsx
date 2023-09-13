import { FormEvent } from "react";



import { PublicLayout } from "@/components/layouts";
import { Button, FormControl, ErrorMessage } from "@/components/ui";

import { formValidator, newMessageValidationSchema } from "@/helpers";
import { useForm } from "@/hooks/useForm";

const newMessage = {
  name: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
};

function Contact() {

  const {
    formState,
    isFormSubmitted,
    isTouched,
    handleBlur,
    handleFieldChange,
    hasErrors,
    handleResetForm
  } = useForm(newMessage)

  const { email, lastName, name, phone, message } = formState;

  const errors = formValidator().getErrors(formState, newMessageValidationSchema);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!hasErrors(errors)) {
      console.log({ formState });

      // TODO implement validation vs backend

      handleResetForm()
    }
  }
  return (
    <PublicLayout
      title={'DIABOOKS | Escríbenos y cuéntanos que piensas acerca de nosotros, o si necesitas ayuda en tu proceso'}
      pageDescription={'Esta página le permite a nuestros usuarios contactarnos y que nos pregunten acerca de todas sus dudas'}>
      <h1 >Cuéntanos, ¿Qué quieres saber?</h1>

      <form style={{ width: "50rem" }} className="form" >
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
          placeholder="Haz tus preguntas, o sugíerenos algo"
          style={{ height: '10rem', marginTop: '1rem' }}
          name="message"
          value={message}
          onChange={handleFieldChange}
          onBlur={handleBlur}
        />

        <Button type="submit" width='50%' backgroundColor="blue" disabled={!!errors} >
          send
        </Button>
      </form>

    </PublicLayout>
  )
}

export default Contact