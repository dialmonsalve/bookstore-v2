import Image from 'next/image';

import { useUI } from '@/hooks';
import { NavLink } from '../ui/NavLink';
import { links } from '@/helpers';

export const PrivateSidebar = () => {

  const { handleToggleSidebar, toggleSidebar } = useUI();

  const handleContentClick = (e: React.MouseEvent<HTMLUListElement | HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();    
    if (!toggleSidebar) return;
    handleToggleSidebar(false);
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
        className={`private-nav__menu ${toggleSidebar ? 'menu-open' : 'menu-close'}`}
        onClick={()=>handleToggleSidebar(true)}
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
