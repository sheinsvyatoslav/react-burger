import burgerIngridientsStyles from './burger-ingredients.module.css';
import BurgerNavigation from '../burger-navigation/burger-navigation';
import BurgerIngredientsSection from '../burger-ingredients-section/burger-ingredients-section';
import data from '../../utils/data.json';

function BurgerIngredients() {
  return (
    <section className={`${burgerIngridientsStyles.container} mr-10`}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <BurgerNavigation />
      <div className={burgerIngridientsStyles.sections}>
        <BurgerIngredientsSection data={data} name='Булки' category='bun'/>
        <BurgerIngredientsSection data={data} name='Соусы' category='sauce'/>
        <BurgerIngredientsSection data={data} name='Начинки' category='main'/>  
      </div>
    </section>
  );
}

export default BurgerIngredients;