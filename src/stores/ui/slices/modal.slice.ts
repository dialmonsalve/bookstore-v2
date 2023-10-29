import { StateCreator } from "zustand";
import { ModalSlice } from "@/stores/interfaces.store";

export const createModalSlice: StateCreator<
  ModalSlice,
  [["zustand/devtools", unknown]]
> = (set) => ({
  showModal: false,
  messageModal: null,
  setShowModal: (showModal, messageModal) => {
    set(
      {
        showModal,
        messageModal,
      },
      false,
      "modal"
    );
  },
});
