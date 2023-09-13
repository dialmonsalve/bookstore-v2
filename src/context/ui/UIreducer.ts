
import { UIState } from './UIProvider';

type UIActionType = 
  | { type: 'UI/handleToggleSidebar', payload:boolean}
  | { type: 'UI/setAlert', payload:boolean}

export const uiReducer = (state: UIState, action: UIActionType): UIState => {

  switch (action.type) {
    case 'UI/handleToggleSidebar':
      return {
        ...state,
        toggleSidebar: action.payload
      }
    case('UI/setAlert'):
    return {
      ...state,
      toggleAlert: action.payload
    }

    default:
      return state;
  }
}