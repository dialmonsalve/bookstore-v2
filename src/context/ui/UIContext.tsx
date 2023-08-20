import { createContext } from 'react';


interface ContextProps {
     toggleSidebar:boolean;
     handleToggleSidebar:()=>void
}

export const UIContext = createContext({} as ContextProps)