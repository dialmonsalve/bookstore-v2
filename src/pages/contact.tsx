import { PublicLayout } from "@/components/layouts"
import { Button, FormControl, Form } from "@/components/ui"

import { FormEvent } from "react"

function Contact() {

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log('SEND FORM');

  }
  return (
    <PublicLayout title={'contact us'} pageDescription={'Find your dreams books here'}>
      <h1 style={{ marginBottom: '6rem' }}  >Tell us what you want</h1>

      <Form onSubmit={handleSubmit} width="50rem" >
        <FormControl
          label="name"
          name="name"
          type="text"
          placeholder="Your name"
        />
        <FormControl
          label="last Name"
          name="name"
          type="text"
          placeholder="Your last name"
        />
        <FormControl
          label="email"
          name="email"
          type="email"
          placeholder="your email"
        />
        <FormControl
          label="phone"
          name="phone"
          type="phone"
          placeholder="your phone"
        />

        <textarea
          className="text-area"
          placeholder="Enter text"
          style={{ height: '10rem' }}
        />

        <Button type="submit" width='50%' backgroundColor="blue" >
          send
        </Button>
      </Form>

    </PublicLayout>
  )
}

export default Contact