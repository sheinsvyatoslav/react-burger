import modalOverlayStyles from './modal-overlay.module.css';
import PropTypes, { InferProps } from 'prop-types';

ModalOverlay.propTypes = {
  onClosePopup: PropTypes.func.isRequired,
};

function ModalOverlay({ onClosePopup }: InferProps<typeof ModalOverlay.propTypes>) {
  const handleClick = () => {
    onClosePopup();
  }

  return (
    <div className={modalOverlayStyles.container} onClick={handleClick}></div>
  );
}

export default ModalOverlay