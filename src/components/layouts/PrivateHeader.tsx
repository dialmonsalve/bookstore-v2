
import { useLoginProviderOrLogout, useUser } from "@/hooks/auth";
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

export const PrivateHeader = () => {

  const { data: staff } = useSession();

  const { logOut } = useLoginProviderOrLogout();

  const user = useUser()

  // console.log(user);
  

  return (
    <header className="private-header">
      <Link href='/admin' className="private-header__brand" >
        <Image className='header__brand--image' src="/logo.svg" alt="" width={75} height={70} priority />
      </Link>

      <div className="private-header__user" >
        <span >Bienvenido {staff?.user?.name}</span>
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
