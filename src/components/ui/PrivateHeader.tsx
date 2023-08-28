import Image from "next/image"
import Link from "next/link"

export const PrivateHeader = () => {
  return (
    <header className="private-header">
      <Link href='/admin' >
        <Image className='header__brand--image' src="/logo.svg" alt="" width={75} height={70} />
      </Link>

      <div className="private-header__user" >
        <li className='private-header__user--item' >
          <Link className="private-header__user--link" href='/auth/logout' >Logout</Link>
        </li>
        <span style={{ textTransform: 'uppercase', fontSize: '1.2rem', color: '#0f386a', marginRight:'1rem' }} >Welcome diego</span>
        <Link href='/auth/configuration'>
          <Image className='private-header__user--user' src="/user.svg" alt="user" width={35} height={35} />
        </Link>
      </div>

    </header>
  )
}
