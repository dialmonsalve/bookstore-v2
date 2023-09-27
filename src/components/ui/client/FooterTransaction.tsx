import { useForm } from '@/hooks/useForm'
import { useFormStore, useUITransactionStore } from '@/store'
import { useEmployeesStore } from '@/store/employee'

interface FooterTransaction {
  initialForm: Record<string, any>
}

export const FooterTransaction = ({ initialForm }: FooterTransaction) => {

  const { handleFieldChange } = useForm(initialForm);
  const formState = useFormStore(state => state.formState);
  const session = useEmployeesStore(state => state.session);
  const formItems = useUITransactionStore(state=>state.formItems);

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
        <p >Total Items: {formItems.length || 0}</p>
        <p >Realizado por: {session?.name} {session?.lastName}</p>
      </div>
    </>
  )
}