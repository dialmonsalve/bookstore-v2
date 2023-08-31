import Image from "next/image"
import Link from "next/link"

export const PrivateHeader = () => {
  return (
    <header className="private-header">
      <Link href='/admin' className="private-header__brand" >
        <Image className='header__brand--image' src="/logo.svg" alt="" width={75} height={70} priority />
      </Link>

      <div className="private-header__user" >
        <span >Bienvenido diego</span>
        <li className='private-header__user--item' >
          <Link className="private-header__user--link" href='/auth/logout' >Logout</Link>
        </li>
        <Link href='/auth/configuration'>
          <Image className='private-header__user--user' src="/user.svg" alt="user" width={35} height={35} />
        </Link>
      </div>

    </header>
  )
}
