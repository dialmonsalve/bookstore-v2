import Image from 'next/image';
import Link from 'next/link';

import { useUI } from '@/hooks';
import { NavLink } from '../ui/NavLink';
import { links } from '@/helpers';

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
          {
            links.map(link=>(

          <NavLink key={link.id} href={link.href} alt={link.alt} src={link.src} >
          {link.alt}
          </NavLink>
            ))
          }
      </ul>
      <button
        className='private-nav__menu'
        onClick={handleToggleSidebar}
      >
        <Image
          src='/icons/menu.svg'
          alt='books' width={30} height={30}
          priority
        />
      </button>

    </nav>

  )
}
