import { Button } from "./"

interface Props {

  data: Record<string, any>[] | null
  tableTitles: string[]
  nameTableFields: string[]
  isEditable: boolean
  handleEdit?: (id: string | number,) => void
  handleDelete: (id: string | number, username?: string | number) => void
}

export const Table = ({
  data,
  tableTitles,
  nameTableFields,
  isEditable,
  handleEdit,
  handleDelete
}: Props) => {

  return (
    <table className="table">
      <thead className='table__header' >
        <tr className='table__header--titles' >
          <th className="table__th" >items</th>
          {
            tableTitles?.map(title => (
              <th className="table__th" key={title}>{title}</th>
            ))
          }
          <th className="table__th" colSpan={2}>
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        {
          data?.map(tableRow => (
            <tr className='table__row' key={tableRow._id }>
              <td className="table__td" >{tableRow.item}</td>
              {
                nameTableFields?.map(field => (
                  <td className="table__td" key={field}>{`${tableRow[field]}`}</td>
                ))
              }
              {
                !tableRow.role?.includes("admin") ?
                  <>
                    {isEditable &&
                      <td className="table__td" >
                        <Button
                          buttonStyle="iconButton"
                          ico="edit"
                          onClick={() => { handleEdit!(tableRow._id!) }}
                        />
                      </td>}

                    <td className="table__td" >
                      <Button
                        buttonStyle="iconButton"
                        ico="trash"
                        onClick={() => handleDelete(tableRow._id!, tableRow.username)}
                      />
                    </td>
                  </>
                  : <><td className="table__td"></td><td className="table__td"></td></>
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}