import { useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from "./modal.module.css";

const modalRoot = document.getElementById("modals");

const Modal = ({ isOpened, children, handleClosePopup }) => {
  useEffect(() => {
    if (!isOpened) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
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

Modal.propTypes = {
  isOpened: PropTypes.bool,
  children: PropTypes.node.isRequired,
  handleClosePopup: PropTypes.func.isRequired,
};

export default Modal;
