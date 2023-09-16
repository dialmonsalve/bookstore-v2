import { ChangeEvent, useState } from "react"
import { Row, Table, TableHeader, Td } from "./services";

export const InputSearch = () => {

  const PruebasDeBusqueda = ["hola", "mundo", "aca", "estamos", "nuevamente", "mas solos que nunca", "pero", "como dice Karol G", "mañana todo será bonito", "la vida es bonita"]

  const [search, setSearch] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const filteredResults = PruebasDeBusqueda.filter(dato => 
    dato.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 20);

  return (
    <div>

      <input type="text" placeholder="search" value={search} onChange={handleChange} />

      <Table  >
        <TableHeader>
          <Td  >frase</Td>
        </TableHeader>
        <tbody>
          {
            filteredResults.map((bus, idx) => (
              <Row key={idx} >

                <Td >{bus}</Td>
              </Row>
            ))
          }
        </tbody>
      </Table>
    </div>
  )
}
