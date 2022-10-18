import { useContext } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import IngredientCard from '../ingredient-card/ingredient-card';
import burgerIngredientsSectionStyles from './burger-ingredients-section.module.css'
import { Card } from '../../utils/constants';
import { IngredientsContext } from '../../contexts/ingredientsContext';

BurgerIngredientsSection.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  onOpenIngredientPopup: PropTypes.func.isRequired
};

function BurgerIngredientsSection({ 
  name, 
  category, 
  onOpenIngredientPopup 
}: InferProps<typeof BurgerIngredientsSection.propTypes> ) {

  const ingredients = useContext(IngredientsContext);
  return (
    <div className="mb-10">
      <h2 className="text text_type_main-medium mb-6">{name}</h2>
      <div className={burgerIngredientsSectionStyles.cards}>
        {ingredients.map((item: Card) => (
          item.type === category &&
          <IngredientCard 
          card={item}
          key={item._id}
          onOpenIngredientPopup={onOpenIngredientPopup}
          />
        ))
        }
      </div>
    </div>
  );
}

export default BurgerIngredientsSection