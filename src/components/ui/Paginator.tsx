import { Button } from "./";
import { useUIStore } from "@/stores/ui/ui.store";
import { URL_CONSTANTS } from "@/constants";

interface PaginatorProps<T> {
  query: EmployeeGetAll;
  totalData: number;
}

interface EmployeeGetAll {
  getAll: Record<string, any> | null | undefined;
  isFetching: boolean;
}

export function Paginator<T>({ query, totalData }: PaginatorProps<T>) {
  const prevPage = useUIStore((state) => state.prevPage);
  const nextPage = useUIStore((state) => state.nextPage);
  const page = useUIStore((state) => state.page);

  const totalPages =
    query.getAll !== undefined &&
    Math.ceil(Number(totalData) / URL_CONSTANTS.limit);

  return (
    <div className="paginator">
      <Button
        backgroundColor="outline-blue"
        onClick={prevPage}
        size="small"
        disabled={query?.isFetching || page === 1}
      >
        Anterior
      </Button>
      <span className="paginator__span">
        Página {page} de {Number(totalPages)}
      </span>
      <Button
        backgroundColor="outline-blue"
        size="small"
        onClick={nextPage}
        disabled={
          query.isFetching || page * URL_CONSTANTS.limit >= Number(totalData)
        }
      >
        Siguiente
      </Button>
    </div>
  );
}
