import { FormEvent } from "react";
import { Layout } from "@/components/layouts/e-commerce";

import {
  Button,
  FormControl,
  TextArea,
} from "@/components/ui/client";

import { formValidator } from "@/helpers";
import { useFormStore } from "@/store";
import { LOGIN_VALIDATION_SCHEMA } from "@/constants";

const formFields = [
  {
    _id: 0,
    name: "name",
    type: "text",
    label: "nombre",
  },
  {
    _id: 1,
    name: "lastName",
    type: "text",
    label: "Apellido(s)",
  },
  {
    _id: 2,
    name: "email",
    type: "text",
    label: "email",
  },
  {
    _id: 3,
    name: "phone",
    type: "text",
    label: "teléfono",
  },
];

const newMessage = {
  name: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

function Contact() {
  const formState = useFormStore<typeof newMessage>((state) => state.formState);
  const checkFormErrors = useFormStore((state) => state.checkFormErrors);
  const handleResetForm = useFormStore((state) => state.handleResetForm);

  const errors = formValidator().getErrors(
    formState,
    LOGIN_VALIDATION_SCHEMA.newMessage
  );
 

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const hasErrors = checkFormErrors(errors);

    if (!hasErrors) {
      console.log({ formState });

      // TODO implement validation vs backend

      handleResetForm(newMessage);
    }
  };
  return (
    <Layout
      title={
        "DIABOOKS | Escríbenos y cuéntanos que piensas acerca de nosotros, o si necesitas ayuda en tu proceso"
      }
      pageDescription={
        "Esta página le permite a nuestros usuarios contactarnos y que nos pregunten acerca de todas sus dudas"
      }
    >
      <h1>Cuéntanos, ¿Qué quieres saber?</h1>

      <form style={{ width: "50rem" }} className="form" onSubmit={handleSubmit} >
        <FormControl
          initialForm={newMessage}
          formFields={formFields}
          errors={errors}
          className="form-control"
          classNameInput="form-control__input"
          classNameLabel="form-control__label"
        />
        <TextArea
          className="form-control__input"
          name="message"
          initialForm={newMessage}
          placeholder="Queremos saber tu opinión"
          errors={errors}
          label="Mensaje"

        />
        <Button
          type="submit"
          width="50%"
          backgroundColor="blue"
          disabled={!!errors}
        >
          Enviar
        </Button>
      </form>
    </Layout>
  );
}

export default Contact;
