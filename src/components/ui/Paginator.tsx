import { Button } from "./";
import { useUisStore } from "@/store/ui";
import { URL_CONSTANTS } from "@/constants";
import { UseQueryResult } from "@tanstack/react-query";

interface PaginatorProps<T> {
  query : UseQueryResult<T | null, unknown>;
  totalData: number;
}

export function Paginator<T>({ query, totalData }: PaginatorProps<T>) {
  const prevPage = useUisStore((state) => state.prevPage);
  const nextPage = useUisStore((state) => state.nextPage);
  const page = useUisStore((state) => state.page);

  const totalPages =
    query.data !== undefined && Math.ceil(Number(totalData) / URL_CONSTANTS.limit);

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
