import { UIContext } from "@/context/ui"
import { useContext } from "react"

export const useUI = () => {

  const context = useContext(UIContext);

  if(context === undefined) throw new Error('Context is not used inside the parent components')

  return context
}
