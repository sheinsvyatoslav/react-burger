import modalStyles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes, { InferProps } from 'prop-types';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { cardTypes } from '../../utils/constants';
import OrderDetails from '../order-details/order-details'

Modal.propTypes = {
  card: cardTypes,
  isOpened: PropTypes.bool.isRequired,
  onClosePopup: PropTypes.func.isRequired,
};

function Modal({ card, isOpened, onClosePopup }: InferProps<typeof Modal.propTypes>) {

  return (
    <div className={`${modalStyles.popup} ${isOpened && modalStyles.popupOpened}`}>
      <ModalOverlay onClosePopup={onClosePopup}/>
      { card.name ? 
        <div className={`${modalStyles.container} pl-10 pt-10 pr-10 pb-15`}>
          <div className={modalStyles.title}>
            <h2 className="text text_type_main-large">Детали ингридиента</h2>
            <button className={modalStyles.closeButtonIngridients} onClick={onClosePopup}>
              <CloseIcon type="primary" />
            </button>
          </div>
          <IngredientDetails card={card}/>
        </div>
        :
        <div className={`${modalStyles.container} pt-30 pb-30 pl-25 pr-25`}>
          <OrderDetails />
          <button className={modalStyles.closeButtonOrder} onClick={onClosePopup}>
            <CloseIcon type="primary" />
          </button>
        </div>
      }
      
    </div>
  );
}

export default Modal