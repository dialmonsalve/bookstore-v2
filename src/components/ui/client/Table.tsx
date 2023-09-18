import { ReactNode } from "react"

interface TableProps {
  children: ReactNode | ReactNode[],
  height?:string
}


export const Table = ({ children, height }: TableProps) => {

  return (
    <div className="table" style={{height}}  >
      <table>
        {children}
      </table>
    </div>
  )
}

interface TableContentProps {
  children: ReactNode | ReactNode[],
  uniqueId?: any
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


export const Row = ({ children, uniqueId }: TableContentProps) => {

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
export const Td = ({ children, textAlign, colSpan }: TdProps) => {

  return (
    <td className="table__td" colSpan={colSpan} style={{ textAlign }}>
      {children}
    </td>
  )
}
export const RowForm = ({ children }: TableContentProps) => {

  return (
    <tr className={`table__row-form`} >
      {children}
    </tr>
  )
}

export const TdForm = ({ children, textAlign, colSpan }: TdProps) => {

  return (
    <td className="table__td-form" colSpan={colSpan} style={{ textAlign }}>
      {children}
    </td>
  )
}