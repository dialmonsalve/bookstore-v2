import Image from 'next/image';

import { useUisStore } from '@/store/ui';

import { NavLink } from '../../ui/client/NavLink';

import { LINKS } from '@/constants';

export const Sidebar = () => {

  const toggleSidebar = useUisStore(state => state.toggleSidebar)
  const handleToggleSidebar = useUisStore(state => state.setToggleSidebar)

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
          LINKS.map(link => (

            <NavLink key={link.id} href={link.href} alt={link.alt} src={link.src} >
              {link.alt}
            </NavLink>
          ))
        }
      </ul>
      <button
        className={`private-nav__menu ${toggleSidebar ? 'menu-open' : 'menu-close'}`}
        onClick={(e) => {
          e.stopPropagation();
          handleToggleSidebar();
        }}
      >
        <Image
          src='/icons/menu.svg'
          alt='books' width={40} height={40}
          priority
        />
      </button>



    </nav>

  )
}
