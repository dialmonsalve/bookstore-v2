import Image from "next/image"
import Link from "next/link"

import {useAuthentication} from "@/hooks/auth";
import {useLoginProviderOrLogout} from "@/hooks/auth/useLoginProviderOrLogout";

export const Header = () => {

  const { status, nextSession } = useAuthentication();
  const { logOut } = useLoginProviderOrLogout();

  const employee = nextSession?.user

  return (
    <header className="private-header">
      <Link href='/admin' className="private-header__brand" >
        <Image className='header__brand--image' src="/logo.svg" alt="" width={75} height={70} priority />
      </Link>

      <div className="private-header__user" >
        <span >{status === 'loading' ? 'Cargando' : `Bienvenido ${ employee?.name}`}</span>
        <li className='private-header__user--item' >
          <button className="private-header__user--link" onClick={() => logOut.mutate()} >Logout</button>
        </li>
        <Link href='/auth/configuration'>
          <Image className='private-header__user--user' src="/user.svg" alt="user" width={35} height={35} />
        </Link>
      </div>
    </header>
  )
}
