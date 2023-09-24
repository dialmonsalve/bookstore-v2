
import { create, } from "zustand"
import { devtools } from "zustand/middleware"

export interface State {
  toggleSidebar: boolean;
  isAlert: boolean;
  alertMessage: string | null;
  isApiError: boolean;
  errorApiMessage: string | null;
  messageModal: string | null;
  showModal: boolean;
  page: number;
}

interface Actions {
  setToggleSidebar: () => void;
  setAlert: (isAlert: boolean, alertMessage?: string | null) => void;
  setErrorMessage: (isAlert: boolean, alertMessage?: string | null) => void;
  setShowModal: (showModal: boolean, messageModal?: string | null) => void;
  nextPage: () => void;
  prevPage: () => void;
}

const UI_INITIAL_STATE: State = {
  toggleSidebar: false,
  isAlert: false,
  isApiError: false,
  showModal: false,
  alertMessage: null,
  errorApiMessage: null,
  messageModal: null,
  page: 1,
}

export const useUisStore = create<State & Actions>()(devtools((set, get) => {

  return {
    ...UI_INITIAL_STATE,
    setToggleSidebar() {
      set((state) => ({ toggleSidebar: !state.toggleSidebar }), false, "toggleSidebar")
    },
    setAlert(isAlert, alertMessage) {
      set(({
        isAlert,
        alertMessage
      }), false, "alert")
      if (isAlert) {
        setTimeout(() => {
          set(({
            isAlert: false,
            alertMessage
          }), false, "alert");
        }, 3000)
      }
    },
    setErrorMessage(isApiError, errorApiMessage) {
      set(({
        isApiError,
        errorApiMessage
      }), false, "errorMessage")
    },
    setShowModal(showModal, messageModal) {
      set(({
        showModal,
        messageModal,
        // isShowModal: true
      }), false, "modal")
    },
    nextPage() {
      set((state) => ({ page: state.page + 1 }), false, "page")
    },
    prevPage() {
      set((state) => ({
        page: state.page > 1 ? state.page - 1 : state.page
      }), false, "page")
    },
  }
}, { name: "User Interface" }))
