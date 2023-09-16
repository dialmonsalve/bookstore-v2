import { ReactNode } from "react"

interface TableProps {
  children: ReactNode | ReactNode[],
}


export const Table = ({ children }: TableProps) => {

  return (
    <div className="table"  >
      <table>
        {children}
      </table>
    </div>
  )
}

interface TableContentProps {
  children: ReactNode | ReactNode[],
}

export const TableHeader = ({ children }: TableContentProps) => {

  return (
    <thead className={`table__header`} >
      <tr className={`table__header--titles`} >
        {children}
      </tr>
    </thead>
  )
}


export const Row = ({ children }: TableContentProps) => {

  return (
    <tr className={`table__row`} >
      {children}
    </tr>
  )
}

interface TdProps {
  children?: string | string[] | ReactNode;
  colSpan?: number
  textAlign?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent'
}
export const Td = ({ children, textAlign, colSpan}: TdProps) => {

  return (
    <td className="table__td" colSpan={colSpan} style={{ textAlign }}>
      {children}
    </td>
  )
}