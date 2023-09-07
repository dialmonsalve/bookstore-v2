
import { useLoginProviderOrLogout, useUser } from "@/hooks/auth";
import { useEmployeesStore } from "@/store/users";
import Image from "next/image"
import Link from "next/link"

export const PrivateHeader = () => {

  const session = useEmployeesStore(state => state.session);
  const { user } = useUser();
  const { logOut } = useLoginProviderOrLogout();

  return (
    <header className="private-header">
      <Link href='/admin' className="private-header__brand" >
        <Image className='header__brand--image' src="/logo.svg" alt="" width={75} height={70} priority />
      </Link>

      {
        user.isLoading ? <p>Cargando...</p>
          :
          <div className="private-header__user" >
            <span >Bienvenido {session?.name}</span>
            <li className='private-header__user--item' >
              <button className="private-header__user--link" onClick={() => logOut.mutate()} >Logout</button>
            </li>
            <Link href='/auth/configuration'>
              <Image className='private-header__user--user' src="/user.svg" alt="user" width={35} height={35} />
            </Link>
          </div>
      }

    </header>
  )
}
