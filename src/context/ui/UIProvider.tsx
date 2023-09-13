import { ReactNode, useCallback, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface Props {
  children: ReactNode;
}

export interface UIState {
  toggleSidebar: boolean;
  toggleAlert: boolean

}

const UI_INITIAL_STATE: UIState = {
  toggleSidebar: false,
  toggleAlert: false
}

export const UIProvider = ({ children }: Props) => {


  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const handleToggleSidebar = (toggleSidebar: boolean) => {

    dispatch({ type: 'UI/handleToggleSidebar', payload: toggleSidebar })

  }

  function setAlert() {
    dispatch({ type: 'UI/setAlert', payload: true });
    setTimeout(() => {
      dispatch({ type: 'UI/setAlert', payload: true });
      setTimeout(() => {
        dispatch({ type: 'UI/setAlert', payload: false });
      }, 2500);
    }, 1000);
  }

  return (
    <UIContext.Provider value={{
      ...state,
      handleToggleSidebar,
      setAlert
    }}>
      {children}
    </UIContext.Provider>
  )
}