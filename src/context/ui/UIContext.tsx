import { createContext } from 'react';


interface ContextProps {
  toggleSidebar: boolean;
  toggleAlert: boolean
  handleToggleSidebar: (toggleSidebar:boolean) => void
  setAlert: () => void
}

export const UIContext = createContext({} as ContextProps)