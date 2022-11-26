import { useEffect, FC, ReactNode } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from "./modal.module.css";

const modalRoot = document.getElementById("modals") as HTMLDivElement;

interface IModal {
  isOpened: boolean;
  handleClosePopup: () => void;
  title?: string
  children: ReactNode;
}

interface KeyboardEvent {
  key: string;
}

const Modal: FC<IModal> = ({ isOpened, children, handleClosePopup }) => {
  useEffect(() => {
    if (!isOpened) return;
    const handleEscClose = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClosePopup();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpened, handleClosePopup]);

  return ReactDOM.createPortal(
    <div
      className={`${modalStyles.popup} ${isOpened && modalStyles.popupOpened}`}
    >
      <div className={`${modalStyles.container} pl-10 pr-10 pt-10 pb-15`}>
        {children}
        <button
          className={modalStyles.closeButton}
          onClick={handleClosePopup}
          type="button"
        >
          <CloseIcon type="primary" />
        </button>
      </div>
      <ModalOverlay handleClosePopup={handleClosePopup} />
    </div>,
    modalRoot
  );
};

export default Modal;
