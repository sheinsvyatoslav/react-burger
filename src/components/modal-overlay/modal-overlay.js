import { useDispatch } from "react-redux";
import modalOverlayStyles from "./modal-overlay.module.css";
import { CLOSE_POPUPS } from "../../services/actions/popups";

function ModalOverlay() {
  const dispatch = useDispatch();
  const handleClosePopup = () => {
    dispatch({ type: CLOSE_POPUPS });
  };

  return (
    <div
      className={modalOverlayStyles.container}
      onClick={handleClosePopup}
    ></div>
  );
}

export default ModalOverlay;
