import Image from "next/image"
import Link from "next/link"

import {useAuthentication} from "@/hooks/auth";
import { useLoginProvider } from "@/hooks/auth/useLoginProvider";

export const Header = () => {

  const { status, nextSession } = useAuthentication();
  const { logOutMutation } = useLoginProvider();

  const employee = nextSession?.user

  return (
    <header className="private-header">
      <Link href='/admin' className="private-header__brand" >
        <Image className='header__brand--image' src="/logo.svg" alt="" width={75} height={70} priority />
      </Link>

      <div className="private-header__user" >
        <span >{status === 'loading' ? 'Cargando' : `Bienvenido ${ employee?.name}`}</span>
        <li className='private-header__user--item' >
          <button className="private-header__user--link" onClick={() => logOutMutation.mutate()} >Logout</button>
        </li>
        <Link href='/auth/configuration'>
          <Image className='private-header__user--user' src="/user.svg" alt="user" width={35} height={35} />
        </Link>
      </div>
    </header>
  )
}
