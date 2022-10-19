import { useContext } from 'react';
import PropTypes from 'prop-types';
import IngredientCard from '../ingredient-card/ingredient-card';
import burgerIngredientsSectionStyles from './burger-ingredients-section.module.css'
import { IngredientsContext } from '../../contexts/ingredientsContext';

BurgerIngredientsSection.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  handleOpenIngredientPopup: PropTypes.func.isRequired
};

function BurgerIngredientsSection({ 
  name, 
  category, 
  handleOpenIngredientPopup 
}) {

  const ingredients = useContext(IngredientsContext);
  return (
    <div className="mb-10">
      <h2 className="text text_type_main-medium mb-6">{name}</h2>
      <div className={burgerIngredientsSectionStyles.cards}>
        {ingredients.map(item => (
          item.type === category &&
          <IngredientCard 
          card={item}
          key={item._id}
          handleOpenIngredientPopup={handleOpenIngredientPopup}
          />
        ))
        }
      </div>
    </div>
  );
}

export default BurgerIngredientsSection