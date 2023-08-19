import { FormEvent, ReactNode } from "react"

interface Props {
  children: ReactNode | ReactNode[],
  onSubmit: (e: FormEvent) => void
  width:string;
}

export const Form = ({ children, width, onSubmit }: Props) => {
  return (
    <form 
    style={{width}}    
    className="form" onSubmit={onSubmit}>      
      {children}
    </form>
  )
}
