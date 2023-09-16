import { useEmployees } from "@/hooks/employee"
import { Button } from "."
import { IEmployee } from "@/types"

interface Props {
  employees: IEmployee[]
}

export const Paginator = ({employees}:Props) => {

  const { queryEmployees, page, nextPage, prevPage } = useEmployees(employees)

  console.log({queryEmployees, page});
  

  return (
    <div className="paginator" >
      
      <Button
        backgroundColor="outline-blue"
        onClick={prevPage}
        disabled={queryEmployees.isFetching || page === 1} >
        Anterior
      </Button>
      <span>{page}</span>

      <Button
        backgroundColor="outline-blue"
        onClick={nextPage}
        disabled={queryEmployees.isFetching } >
        Siguiente
      </Button>

    </div>
  )
}
