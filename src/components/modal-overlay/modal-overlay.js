import PropTypes from "prop-types";
import modalOverlayStyles from "./modal-overlay.module.css";

const ModalOverlay = ({ handleClosePopup }) => {
  return (
    <div
      className={modalOverlayStyles.container}
      onClick={handleClosePopup}
    ></div>
  );
};

ModalOverlay.propTypes = {
  handleClosePopup: PropTypes.func.isRequired,
};

export default ModalOverlay;
