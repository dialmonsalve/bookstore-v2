import Image from "next/image";

import { useUIStore } from "@/stores/ui/ui.store";

import { LINKS } from "@/constants";

import { NavLink } from "@/components/ui";

export const Sidebar = () => {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const handleToggleSidebar = useUIStore((state) => state.setToggleSidebar);

  const handleContentClick = (
    e: React.MouseEvent<HTMLUListElement | HTMLLIElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (!toggleSidebar) return;
    handleToggleSidebar();
  };


  return (
    <nav
      className={`private-nav ${
        toggleSidebar ? "openSidebar" : "closeSidebar"
      }`}
      onClick={handleContentClick}
    >
      <ul className="private-nav__container">
        {LINKS.map((link) => (
          <NavLink key={link.id} href={link.href} alt={link.alt} src={link.src}>
            {link.alt}
          </NavLink>
        ))}
      </ul>
      <button
        className={`private-nav__menu ${
          toggleSidebar ? "menu-open" : "menu-close"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          handleToggleSidebar();
        }}
      >
        <Image
          src="/icons/menu.svg"
          alt="books"
          width={30}
          height={30}
          priority
        />
      </button>
    </nav>
  );
};
