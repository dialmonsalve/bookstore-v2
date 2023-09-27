import Image from "next/image";
import { FormEvent, useState } from "react";

interface Props {
  search: string
  setSearch: (search: string) => void

  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export const InputSearch = ({ onSubmit, search, setSearch }: Props) => {


  return (
    <div className="nav__search" >
      <form action="" onSubmit={onSubmit}  >
        <input
          type="text"
          name="search"
          id="search"
          className="nav__search--input"
          placeholder="búsqueda" value={search}
          onChange={(e) => setSearch(e.target.value)}

        />
        <button type="submit" >
          <Image className="nav__search--image" src='/search.svg' width={18} height={18} alt="search" />
        </button>
      </form>

    </div>
  )
}
