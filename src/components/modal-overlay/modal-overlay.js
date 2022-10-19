import modalOverlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

ModalOverlay.propTypes = {
  handleClosePopup: PropTypes.func.isRequired,
};

function ModalOverlay({ handleClosePopup }) {
  const handleClick = () => {
    handleClosePopup();
  }

  return (
    <div className={modalOverlayStyles.container} onClick={handleClick}></div>
  );
}

export default ModalOverlay