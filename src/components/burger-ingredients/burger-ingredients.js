import PropTypes from 'prop-types';

import IngredientDetails from '../ingredient-details/ingredient-details';
import BurgerNavigation from '../burger-navigation/burger-navigation';
import BurgerIngredientsSection from '../burger-ingredients-section/burger-ingredients-section';
import Modal from '../modal/modal';

import { INGREDIENT_TYPES } from '../../utils/constants';
import { cardTypes } from '../../utils/constants';

import burgerIngredientsStyles from './burger-ingredients.module.css';

BurgerIngredients.propTypes = {
  handleOpenIngredientPopup: PropTypes.func.isRequired,
  selectedCard: cardTypes,
  handleClosePopup: PropTypes.func.isRequired,
  isIngredientPopupOpened: PropTypes.bool.isRequired
};

function BurgerIngredients({ 
  selectedCard, 
  isIngredientPopupOpened, 
  handleOpenIngredientPopup, 
  handleClosePopup, 
}) {

  return (
    <section className={`${burgerIngredientsStyles.container} mr-10`}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <BurgerNavigation />
      <div className={burgerIngredientsStyles.sections}>
        <BurgerIngredientsSection name='Булки' category={INGREDIENT_TYPES.BUN} handleOpenIngredientPopup={handleOpenIngredientPopup}/>
        <BurgerIngredientsSection name='Соусы' category={INGREDIENT_TYPES.SAUCE} handleOpenIngredientPopup={handleOpenIngredientPopup}/>
        <BurgerIngredientsSection name='Начинки' category={INGREDIENT_TYPES.MAIN} handleOpenIngredientPopup={handleOpenIngredientPopup}/>  
      </div>
      <Modal isOpened={isIngredientPopupOpened} handleClosePopup={handleClosePopup} title='Детали ингридиента'>
        <IngredientDetails card={selectedCard}/>
      </Modal>
    </section>
  );
}

export default BurgerIngredients;