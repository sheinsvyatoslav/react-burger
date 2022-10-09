import burgerIngridientsStyles from './burger-ingredients.module.css';
import BurgerNavigation from '../burger-navigation/burger-navigation';
import BurgerIngredientsSection from '../burger-ingredients-section/burger-ingredients-section';
import PropTypes, { InferProps } from 'prop-types';

BurgerIngredients.propTypes = {
  ingridients: PropTypes.array.isRequired,
  onOpenIngridientPopup: PropTypes.func.isRequired
};

function BurgerIngredients({ ingridients, onOpenIngridientPopup }: InferProps<typeof BurgerIngredients.propTypes>) {
  return (
    <section className={`${burgerIngridientsStyles.container} mr-10`}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <BurgerNavigation />
      <div className={burgerIngridientsStyles.sections}>
        <BurgerIngredientsSection ingridients={ingridients} name='Булки' category='bun' onOpenIngridientPopup={onOpenIngridientPopup}/>
        <BurgerIngredientsSection ingridients={ingridients} name='Соусы' category='sauce' onOpenIngridientPopup={onOpenIngridientPopup}/>
        <BurgerIngredientsSection ingridients={ingridients} name='Начинки' category='main' onOpenIngridientPopup={onOpenIngridientPopup}/>  
      </div>
    </section>
  );
}

export default BurgerIngredients;