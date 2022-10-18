import PropTypes, { InferProps } from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientDetails from '../ingredient-details/ingredient-details';
import BurgerNavigation from '../burger-navigation/burger-navigation';
import BurgerIngredientsSection from '../burger-ingredients-section/burger-ingredients-section';
import Modal from '../modal/modal';

import { INGREDIENT_TYPES } from '../../utils/constants';
import { cardTypes } from '../../utils/constants';

import burgerIngredientsStyles from './burger-ingredients.module.css';
import modalStyles from '../modal/modal.module.css';

BurgerIngredients.propTypes = {
  onOpenIngredientPopup: PropTypes.func.isRequired,
  selectedCard: cardTypes,
  onClosePopup: PropTypes.func.isRequired,
  isIngredientPopupOpened: PropTypes.bool.isRequired
};

function BurgerIngredients({ 
  selectedCard, 
  isIngredientPopupOpened, 
  onOpenIngredientPopup, 
  onClosePopup, 
}: InferProps<typeof BurgerIngredients.propTypes>) {

  return (
    <section className={`${burgerIngredientsStyles.container} mr-10`}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <BurgerNavigation />
      <div className={burgerIngredientsStyles.sections}>
        <BurgerIngredientsSection name='Булки' category={INGREDIENT_TYPES.BUN} onOpenIngredientPopup={onOpenIngredientPopup}/>
        <BurgerIngredientsSection name='Соусы' category={INGREDIENT_TYPES.SAUCE} onOpenIngredientPopup={onOpenIngredientPopup}/>
        <BurgerIngredientsSection name='Начинки' category={INGREDIENT_TYPES.MAIN} onOpenIngredientPopup={onOpenIngredientPopup}/>  
      </div>
      <Modal isOpened={isIngredientPopupOpened} onClosePopup={onClosePopup}>
        <div className={`${modalStyles.container} pl-10 pt-10 pr-10 pb-15`}>
          <div className={modalStyles.title}>
            <h2 className="text text_type_main-large">Детали ингридиента</h2>
            <button className={modalStyles.closeButtonIngredients} onClick={onClosePopup}>
              <CloseIcon type="primary" />
            </button>
          </div>
          <IngredientDetails card={selectedCard}/>
        </div>
      </Modal>
    </section>
  );
}

export default BurgerIngredients;