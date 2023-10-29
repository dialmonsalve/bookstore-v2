import { useUIStore } from "@/stores/ui/ui.store";
import { Button } from ".";
import { ReactNode } from "react";
import Image from "next/image";

interface ModalProps {
  typeModal: "success" | "warning" | "error";
  children: ReactNode;
}
export const Modal = ({ typeModal, children }: ModalProps) => {
  const messageModal = useUIStore((state) => state.messageModal);
  const showModal = useUIStore((state) => state.showModal);
  const setShowModal = useUIStore((state) => state.setShowModal);

  const color =
    typeModal === "success"
      ? "#0c8f4c"
      : typeModal === "warning"
      ? "#f60909b2"
      : "#f60909b2";

  const handleCancelAction = () => {
    setShowModal(false);
  };

  return (
    showModal && (
      <div className={`modal`} onClick={handleCancelAction}>
        <div
          className="modal__container"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <h4 className="modal__container--title" style={{ color }}>
            {typeModal}
          </h4>
          <Image
            src={`/media/${typeModal}.png`}
            className="modal__container--image"
            alt={typeModal}
            width={200}
            height={200}
            priority
          />
          <p className="modal__container--message">{messageModal}</p>
          <div className="modal__container--buttons">
            {children}
            <Button backgroundColor="red" onClick={handleCancelAction}>
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    )
  );
};
