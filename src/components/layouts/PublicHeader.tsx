import Image from 'next/image';
import Link from "next/link";
import { SignInButton } from '../ui/SignInButton';

type Status = 'authenticated' | 'not-authenticated'

export const Header = () => {

  const status: Status = 'authenticated';

  return (
    <header className="header" >
      <div className='header__brand' >
        <Link href='/' >
          <Image className='header__brand--image' src="/logo.svg" alt="" width={75} height={70} />
        </Link>

        <ul className='header__brand--navigation' >
          <li className='header__brand--navigation-item' >
            <Link className="header__brand--navigation-link" href='/about'>Nosotros</Link>
          </li>
          <li className='header__brand--navigation-item' >
            <Link className="header__brand--navigation-link" href='/contact' >Contacto</Link>
          </li>
        </ul>
      </div>
      <SignInButton />


      <div className='header__login' >

        <div className='header__login--cart' >
          <Link href='cart' >
            <Image src="/cart.svg" alt="" width={40} height={40} />
            <span className='header__login--number'>1</span>
          </Link>
        </div>

        <ul className='header__login--nav' >

          {
            status === 'not-authenticated' &&
            <>
              <li className='header__login--nav-item' >
                <Link className="header__login--nav-link" href='/auth/create-account' >Crear cuenta</Link>
              </li>
              <li className='header__login--nav-item' >
                <Link className="header__login--nav-link" href='/auth/login'>Login</Link>
              </li>
            </>
          }

          {
            status === 'authenticated' &&
            <>
              <span style={{ textTransform: 'uppercase', fontSize: '1.2rem', color: '#0f386a' }} >Bienvenido diego</span>
              <li className='header__login--nav-item' >
                <Link className="header__login--nav-link" href='/auth/logout' >Logout</Link>
              </li>
            </>
          }
        </ul>
        <Link href='/auth/configuration'>
          <Image className='header__login--user' src="/user.svg" alt="user" width={35} height={35} />
        </Link>
      </div>
    </header>
  )
}
