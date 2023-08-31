
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  src: string
  alt: string;
  href: string;
  children: string | string[];
}

export const NavLink = ({ src, alt, children, href }: Props) => {
  return (
    <li
      className='private-nav__container--item'
    >
      <Image
        src={src}
        alt={alt} width={40} height={20} priority />
      <Link
        href={href}
        className='private-nav__container--link'
      >{children}
      </Link>
    </li>
  )
}
