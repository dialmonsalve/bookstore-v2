import { useEffect } from "react";
import { ReactChangeEvent } from "../types";
import { useFormStore } from "@/stores/form/form.store";

export function useForm(initialForm: Record<string, any>) {
  const setFormState = useFormStore((state) => state.setFormState);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const handleFieldChange = (e: ReactChangeEvent) => {
    const { name, value } = e.target;
    
    const newForm = { [name]: value };
    setFormState(newForm);
  };

  return {
    handleFieldChange,
  };
}
