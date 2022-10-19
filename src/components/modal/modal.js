import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
const modalRoot = document.getElementById("modals");

Modal.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  handleClosePopup: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

function Modal({ isOpened, children, title, handleClosePopup }) {

  useEffect(() => {
    if (!isOpened) return;
    const handleEscClose = e => {
      if (e.key === 'Escape') {
        handleClosePopup();
      }
    }

    document.addEventListener('keydown', handleEscClose);
    
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    } 
  }, [isOpened, handleClosePopup]);

  return ReactDOM.createPortal(
    <div className={`${modalStyles.popup} ${isOpened && modalStyles.popupOpened}`}>
      <div className={`${modalStyles.container} ${title ? `pl-10 pt-10 pr-10 pb-15` : `pt-30 pb-30 pl-25 pr-25`}`}>
        {title && <h2 className={`${modalStyles.title} text text_type_main-large`}>{title}</h2>}
        {children}
        <button className={modalStyles.closeButton} onClick={handleClosePopup} type='button'>
          <CloseIcon type="primary" />
        </button>
      </div>
      <ModalOverlay handleClosePopup={handleClosePopup}/>
    </div>, 
    modalRoot
  );
}

export default Modal