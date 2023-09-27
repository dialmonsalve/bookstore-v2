import { FormEvent } from "react";
import Link from "next/link";

import { InputSearch } from "@/components/ui/client";

export const Navbar = () => {

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("buscando");

  }
  return (
    <nav className="nav" >

      {/* <InputSearch onSubmit={()=>handleSearch()} /> */}

      <div className="nav__menu" >
        <ul className="nav__menu--container" >
          <li className="nav__menu--item" >
            <Link className="nav__menu--link" href='/books' >Libros</Link>
          </li>
          <li>
            <Link className="nav__menu--link" href='/stationeries' >Papelería</Link>
          </li>
          <li>
            <Link className="nav__menu--link" href='/toys' >Juguetes</Link>
          </li>
          <li>
            <Link className="nav__menu--link" href='/fashion' >Fashion</Link>
          </li>
        </ul>
      </div>



    </nav>
  )
}
