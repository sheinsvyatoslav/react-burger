import PropTypes from "prop-types";
import modalOverlayStyles from "./modal-overlay.module.css";

ModalOverlay.propTypes = {
  handleClosePopup: PropTypes.func.isRequired,
};

function ModalOverlay({ handleClosePopup }) {
  return (
    <div
      className={modalOverlayStyles.container}
      onClick={handleClosePopup}
    ></div>
  );
}

export default ModalOverlay;
