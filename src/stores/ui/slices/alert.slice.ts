import { StateCreator } from "zustand";
import { AlertSlice } from "@/stores/interfaces.store";

export const createAlertSlice: StateCreator<
  AlertSlice,
  [["zustand/devtools", unknown]]
> = (set) => ({
  alertType: "",
  showAlert: false,
  alertMessage: null,
  setAlert: (alertType, showAlert, alertMessage) => {
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
            alertType: "",
          },
          false,
          "alert"
        );
      }, 3000);
    }
  },
});
