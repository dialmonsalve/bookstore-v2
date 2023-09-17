import { useEmployees } from "@/hooks/employee"
import { Button } from "./"
import { useUisStore } from "@/store/ui"
import { URL_CONSTANTS } from "@/database";

export const Paginator = () => {

  const queryEmployees = useEmployees();

  const prevPage = useUisStore(state => state.prevPage)
  const nextPage = useUisStore(state => state.nextPage)
  const page = useUisStore(state => state.page)

  const totalEmployees = queryEmployees?.data?.totalEmployees

  

  const totalPages = queryEmployees?.data !== undefined && Math.ceil(Number(totalEmployees) / ( URL_CONSTANTS.limit)) 

  return (
    <div className="paginator" >

      <Button
        backgroundColor="outline-blue"
        onClick={prevPage}
        size="small"
        disabled={queryEmployees.isFetching || page === 1} >
        Anterior
      </Button>
      <span className="paginator__span" >
        Página {page} de {Number(totalPages)}
        </span>
      <Button
        backgroundColor="outline-blue"
        size="small"
        onClick={nextPage}
        disabled={queryEmployees.isFetching || page * URL_CONSTANTS.limit >= Number(totalEmployees) } >
        Siguiente
      </Button>

    </div>
  )
}
