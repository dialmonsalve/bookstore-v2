import { PublicLayout } from "@/components/layouts"
import { Button, FormControl, Form } from "@/components/ui"
import Link from "next/link";

import { FormEvent } from "react"

function CreateAccount() {

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log('CREATING USER');

  }
  return (
    <PublicLayout title={'contact us'} pageDescription={'Find your dreams books here'}>
     <h1 style={{ marginBottom: '6rem' }} >Create your account and fly</h1>

      <Form onSubmit={handleSubmit} width="60rem" >
        <FormControl
          label="name"
          name="name"
          type="text"
          placeholder="Your name"
          inputWidth="65%"
          labelWidth="30%"

        />
        <FormControl
          label="last Name"
          name="name"
          type="text"
          placeholder="Your last name"
          inputWidth="65%"
          labelWidth="30%"
        />
        <FormControl
          label="email"
          name="email"
          type="email"
          placeholder="your email"
          inputWidth="65%"
          labelWidth="30%"
        />
        <FormControl
          label="phone"
          name="phone"
          type="phone"
          placeholder="your phone"
          inputWidth="65%"
          labelWidth="30%"
        />
        <FormControl
          label="password"
          name="password"
          type="password"
          placeholder="your password"
          inputWidth="65%"
          labelWidth="30%"
        />
        <FormControl
          label="repite password"
          name="repitePassword"
          type="password"
          placeholder="Repite your password"
          inputWidth="65%"
          labelWidth="30%"
        />

        <div style={{ display: 'flex' }}>
          <Button type="submit" width='40%' backgroundColor="green" >
            Create account
          </Button>

          <Link href='login' className="btn btn--blue btn--medium" >
            Login
          </Link>
        </div>
      </Form>

    </PublicLayout>
  )
}

export default CreateAccount