import { useFormStore } from '@/store'
import { useEmployeesStore } from '@/store/employee'
import { ReactChangeEvent } from '@/types'

interface FooterTransaction {
  handleFieldChange: (e: ReactChangeEvent) => void
  length:number
}

export const FooterTransaction = ({handleFieldChange, length}:FooterTransaction) => {

  const session = useEmployeesStore(state => state.session)
  const formState = useFormStore(state=>state.formState)

  return (
    <>
      <textarea
        className="transactions-footer__left"
        name="observations"
        cols={60}
        rows={3}
        onChange={handleFieldChange}
        value={formState.observations}
        placeholder="observaciones"
      >
      </textarea>

      <div className="transactions-footer__right">
        <p >Total Items: {length || 0}</p>
        <p >Realizado por: {session?.name} {session?.lastName}</p>
      </div>
    </>
  )
}