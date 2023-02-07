import { FC } from "react";

import styles from "./modal-overlay.module.scss";

type ModalOverlayProps = {
  handleClosePopup: () => void;
};

export const ModalOverlay: FC<ModalOverlayProps> = ({ handleClosePopup }) => {
  return <div className={styles.container} onClick={handleClosePopup}></div>;
};
