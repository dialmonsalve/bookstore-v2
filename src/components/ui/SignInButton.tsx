
import { signIn, signOut, useSession } from "next-auth/react"


export const SignInButton = () => {

  const { data: session } = useSession();

  if (session && session.user) {
    
    return (
      <div>
        <p>{session.user.name}</p>

        <button onClick={() => signOut()} >Sign Out</button>
      </div>
    )
  }

  return (
    <button
      onClick={() => signIn()}
    >Sing In</button>
  )
}
