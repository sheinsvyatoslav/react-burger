import IngridientCard from '../ingridient-card/ingridient-card';
import burgerIngridientsSectionStyles from './burger-ingredients-section.module.css'
import PropTypes, { InferProps } from 'prop-types';

BurgerIngredientsSection.propTypes = {
  ingridients: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  onOpenIngridientPopup: PropTypes.func.isRequired
};

function BurgerIngredientsSection({ 
  ingridients, 
  name, 
  category, 
  onOpenIngridientPopup 
}: InferProps<typeof BurgerIngredientsSection.propTypes> ) {
  return (
    <div className="mb-10">
      <h2 className="text text_type_main-medium mb-6">{name}</h2>
      <div className={burgerIngridientsSectionStyles.cards}>
        {ingridients.map((item, i) => (
          item.type === category &&
          <IngridientCard 
          card={item}
          key={item._id}
          onOpenIngridientPopup={onOpenIngridientPopup}
          />
        ))
        }
      </div>
    </div>
  );
}

export default BurgerIngredientsSection