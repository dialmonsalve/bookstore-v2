import { useUisStore } from "@/store/ui"
import { Button } from ".";
import { ReactNode } from "react";


interface ModalProps {
  typeModal: 'success' | 'warning' | 'error';
  children: ReactNode
}
export const Modal = ({ typeModal, children }: ModalProps) => {

  const messageModal = useUisStore(state => state.messageModal);
  const showModal = useUisStore(state => state.showModal);
  const setShowModal = useUisStore(state => state.setShowModal);
  const isShowModal = useUisStore(state => state.isShowModal);


  const color =
    typeModal === 'success' ? "#0c8f4c"
      : typeModal === "warning" ? "#bfb52e" : "#f60909b2"

  const handleCancelAction = () => {
    setShowModal(false);
  }

  return (

    showModal &&
    <div className={`${isShowModal ? 'show-modal' : 'hide-modal'}`}
      onClick={handleCancelAction} >
      <div className="show-modal__container" onClick={(e) => { e.stopPropagation() }
      } >
        <h4
          className="show-modal__container--title"
          style={{ color }}
        >{typeModal}</h4>
        <p className="show-modal__container--message" >{messageModal}</p>
        <div className="show-modal__container--buttons" >
          {children}
          <Button onClick={handleCancelAction} >
            Cancelar
          </Button>

        </div>
      </div>
    </div>
  )
}
