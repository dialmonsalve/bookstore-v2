import { ReactNode, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface Props {
  children: ReactNode;
}

export interface UIState {
  toggleSidebar: boolean;
}


export const UI_INITIAL_STATE: UIState = {
  toggleSidebar: false,
}

export const UIProvider = ({ children }: Props) => {

  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const handleToggleSidebar = () => {

    
    dispatch({ type: '[UI] - handleToggleSidebar', payload: !state.toggleSidebar})
  }

  return (
    <UIContext.Provider value={{
      ...state,
      handleToggleSidebar
    }}>
      {children}
    </UIContext.Provider>
  )
}