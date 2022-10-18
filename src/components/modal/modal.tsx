import { useEffect } from 'react';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes, { InferProps } from 'prop-types';

Modal.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClosePopup: PropTypes.func.isRequired,
};

function Modal({ isOpened, children, onClosePopup }: InferProps<typeof Modal.propTypes>) {

  useEffect(() => {
    const handleEscClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClosePopup();
      }
    }

    document.addEventListener('keydown', handleEscClose);
    
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    } 
  }, []);

  return (
    <div className={`${modalStyles.popup} ${isOpened && modalStyles.popupOpened}`}>
      {children}
      <ModalOverlay onClosePopup={onClosePopup}/>
    </div>
  );
}

export default Modal