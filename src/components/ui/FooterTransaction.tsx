import { useUIStore, useEmployeesStore } from "@/stores";
import { TextArea } from "./";

interface FooterTransaction {
  initialForm: Record<string, any>;
}

export const FooterTransaction = ({ initialForm }: FooterTransaction) => {
  const session = useEmployeesStore((state) => state.session);
  const formItems = useUIStore((state) => state.formItems);

  return (
    <>
      <TextArea
        className="transactions-footer__left"
        initialForm={initialForm}
        name="observations"
        placeholder="observaciones"
        label="Observaciones"
      />
      <div className="transactions-footer__right">
        <p>Total Items: {formItems.length || 0}</p>
        <p>
          Realizado por: {session?.name} {session?.lastName}
        </p>
      </div>
    </>
  );
};
