import { PublicLayout } from "@/components/layouts"
import { Button, FormControl, Form } from "@/components/ui"
import Link from "next/link";

import { FormEvent } from "react"

function Login() {

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log('LOGIN');

  }
  return (
    <PublicLayout title={'login'} pageDescription={'Find your dreams books here'}>
      <h1 style={{ marginBottom: '6rem' }} >Enter and the magic begins</h1>

      <Form onSubmit={handleSubmit} width="50rem" >
        <FormControl
          label="email"
          name="email"
          type="email"
          placeholder="Your email"
        />
        <FormControl
          label="password"
          name="password"
          type="text"
          placeholder="Your password"
        />

        <div style={{ display: 'flex' }}>
          <Button type="submit" width='40%' backgroundColor="blue" >
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