import { create } from "zustand";
import { devtools } from "zustand/middleware";

type TypeAlert = "" | "success" | "error";

export interface State {
  toggleSidebar: boolean;
  alertType: TypeAlert;
  showAlert: boolean;
  alertMessage: string | null;
  messageModal: string | null;
  showModal: boolean;
  page: number;
}

interface Actions {
  setToggleSidebar: () => void;
  setAlert: (
    alertType: TypeAlert,
    showAlert: boolean,
    alertMessage?: string | null
  ) => void;
  setShowModal: (showModal: boolean, messageModal?: string | null) => void;
  nextPage: () => void;
  prevPage: () => void;
  resetPage:()=>void
}

const UI_INITIAL_STATE: State = {
  toggleSidebar: false,
  alertType: "",
  showAlert: false,
  showModal: false,
  alertMessage: null,
  messageModal: null,
  page: 1,
};

export const useUisStore = create<State & Actions>()(
  devtools(
    (set, get) => {
      return {
        ...UI_INITIAL_STATE,
        setToggleSidebar() {
          set(
            (state) => ({ toggleSidebar: !state.toggleSidebar }),
            false,
            "toggleSidebar"
          );
        },
        setAlert(alertType, showAlert, alertMessage) {
          set(
            {
              alertType,
              showAlert,
              alertMessage,
            },
            false,
            "alert"
          );
          if (showAlert) {
            setTimeout(() => {
              set(
                {
                  showAlert: false,
                  alertMessage,
                },
                false,
                "alert"
              );
            }, 3000);
          }
        },
        setShowModal(showModal, messageModal) {
          set(
            {
              showModal,
              messageModal,
            },
            false,
            "modal"
          );
        },
        nextPage() {
          set((state) => ({ page: state.page + 1 }), false, "page");
        },
        prevPage() {
          set(
            (state) => ({
              page: state.page > 1 ? state.page - 1 : state.page,
            }),
            false,
            "page"
          );
        },
        resetPage() {
          set({page:1})
        }
      };
    },
    { name: "User Interface" }
  )
);
