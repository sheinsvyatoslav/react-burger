import burgerIngridientsStyles from './burger-ingredients.module.css';
import BurgerNavigation from '../burger-navigation/burger-navigation';
import BurgerIngredientsSection from '../burger-ingredients-section/burger-ingredients-section';
import PropTypes, { InferProps } from 'prop-types';
import { INGREDIENT_TYPES } from '../../utils/constants';
import { cardTypes } from '../../utils/constants';

BurgerIngredients.propTypes = {
  ingridients: PropTypes.arrayOf(cardTypes).isRequired,
  onOpenIngridientPopup: PropTypes.func.isRequired
};

function BurgerIngredients({ ingridients, onOpenIngridientPopup }: InferProps<typeof BurgerIngredients.propTypes>) {
  return (
    <section className={`${burgerIngridientsStyles.container} mr-10`}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <BurgerNavigation />
      <div className={burgerIngridientsStyles.sections}>
        <BurgerIngredientsSection ingridients={ingridients} name='Булки' category={INGREDIENT_TYPES.BUN} onOpenIngridientPopup={onOpenIngridientPopup}/>
        <BurgerIngredientsSection ingridients={ingridients} name='Соусы' category={INGREDIENT_TYPES.SAUCE} onOpenIngridientPopup={onOpenIngridientPopup}/>
        <BurgerIngredientsSection ingridients={ingridients} name='Начинки' category={INGREDIENT_TYPES.MAIN} onOpenIngridientPopup={onOpenIngridientPopup}/>  
      </div>
    </section>
  );
}

export default BurgerIngredients;