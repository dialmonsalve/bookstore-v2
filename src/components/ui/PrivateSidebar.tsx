import Image from 'next/image';
import Link from 'next/link';

import { useUI } from '@/hooks/useUI';

export const PrivateSidebar = () => {

  const { handleToggleSidebar, toggleSidebar } = useUI();

  const handleContentClick = (e: React.MouseEvent<HTMLUListElement | HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();

    if (!toggleSidebar) return;
    handleToggleSidebar();
  };


  return (

    <nav
      className={`private-nav ${toggleSidebar ? 'openSidebar' : 'closeSidebar'}`}
      onClick={handleContentClick}
    >

      <ul
        className='private-nav__container'
        >
        <li
          className='private-nav__container--item'
        >
          <Image
            src='/icons/books.svg'
            alt='books' width={20} height={20} />
          <Link
            href={'/admin/books'}
            className='private-nav__container--link'
          >books
          </Link>
        </li>

        <li
          className='private-nav__container--item'
        >
          <Image
            src='/icons/truck.svg'
            alt='books' width={20} height={20} />
          <Link
            href={'/admin/toys'}
            className='private-nav__container--link'
          >toys
          </Link>
        </li>

        <li
          className='private-nav__container--item'
        >
          <Image
            src='/icons/paper.svg'
            alt='books' width={20} height={20} />
          <Link
            href={'/admin/stationeries'}
            className='private-nav__container--link'
          >
            stationeries
          </Link>
        </li>

        <li
          className='private-nav__container--item'
        >
          <Image
            src='/icons/user.svg'
            alt='books' width={20} height={20} />
          <Link
            href={'/admin/users'}
            className='private-nav__container--link'
          >
            users
          </Link>
        </li>

        <li
          className='private-nav__container--item'
        >
          <Image
            src='/icons/truck.svg'
            alt='truck' width={20} height={20} />
          <Link
            href={'/admin/logistic'}
            className='private-nav__container--link'
          >
            logistic
          </Link>
        </li>

      </ul>
      <button
        className='private-nav__menu'
        onClick={handleToggleSidebar}
      >
        <Image
          src='/icons/menu.svg'
          alt='books' width={30} height={30}
        />
      </button>

    </nav>

  )
}
