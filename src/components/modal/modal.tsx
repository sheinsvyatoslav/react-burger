import { FC, ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppSelector } from "../../hooks/redux-hooks";
import { AppLoader } from "../loader/loader";
import { ModalOverlay } from "../modal-overlay/modal-overlay";

import styles from "./modal.module.scss";

const modalRoot = document.getElementById("modals") as HTMLDivElement;

type ModalProps = {
  isOpened: boolean;
  handleClosePopup: () => void;
  title?: string;
  children: ReactNode;
};

type KeyboardEvent = {
  key: string;
};

export const Modal: FC<ModalProps> = ({ isOpened, children, handleClosePopup }) => {
  const { createOrderState } = useAppSelector((state) => state.order);

  useEffect(() => {
    if (!isOpened) {
      return undefined;
    }

    const handleEscClose = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClosePopup();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => document.removeEventListener("keydown", handleEscClose);
  }, [isOpened, handleClosePopup]);

  return ReactDOM.createPortal(
    <div className={`${styles.popup} ${isOpened ? styles.popupOpened : ""}`}>
      {createOrderState === "pending" ? (
        <AppLoader />
      ) : (
        <div className={`${styles.container} pl-10 pr-10 pt-10 pb-15`}>
          {children}
          <button
            className={styles.closeButton}
            onClick={handleClosePopup}
            type="button"
            data-at-selector="close-modal-button"
          >
            <CloseIcon type="primary" />
          </button>
        </div>
      )}

      <ModalOverlay handleClosePopup={handleClosePopup} />
    </div>,
    modalRoot
  );
};
