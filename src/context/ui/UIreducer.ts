import { stat } from 'fs';
import { UIState } from './UIProvider';


type UIActionType = 
  | { type: '[UI] - handleToggleSidebar', payload:boolean}

export const uiReducer = (state: UIState, action: UIActionType): UIState => {

  switch (action.type) {
    case '[UI] - handleToggleSidebar':
      return {
        ...state,
        toggleSidebar: action.payload
      }

    default:
      return state;
  }
}