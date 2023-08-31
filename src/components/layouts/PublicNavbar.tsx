import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
  return (
    <nav className="nav" >

      <div className="nav__search" >
        <form action="">
        <input type="text" className="nav__search--input" placeholder="búsqueda" />
        <button type="submit" >
          <Image className="nav__search--image"  src='/search.svg' width={18} height={18} alt="search" />
          </button>
        </form>

      </div>

      <div className="nav__menu" >
        <ul className="nav__menu--container" >
          <li className="nav__menu--item" >
            <Link className="nav__menu--link" href='/store/books' >Libros</Link>
          </li>
          <li>
            <Link className="nav__menu--link" href='/store/stationeries' >Papelería</Link>
          </li>
          <li>
            <Link className="nav__menu--link" href='/store/toys' >Juguetes</Link>
          </li>
          <li>
            <Link className="nav__menu--link" href='/store/fashion' >Fashion</Link>
          </li>
        </ul>
      </div>



    </nav>
  )
}
