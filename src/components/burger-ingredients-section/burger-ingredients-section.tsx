import IngridientCard from '../ingridient-card/ingridient-card';
import burgerIngridientsSectionStyles from './burger-ingredients-section.module.css'
import PropTypes, { InferProps } from 'prop-types';

BurgerIngredientsSection.propTypes = {
  data: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

function BurgerIngredientsSection({ data, name, category }: InferProps<typeof BurgerIngredientsSection.propTypes> ) {
  return (
    <div className="mb-10">
      <h2 className="text text_type_main-medium mb-6">{name}</h2>
      <div className={burgerIngridientsSectionStyles.cards}>
        {data.map((item, i) => (
          item.type === category &&
          <IngridientCard 
          image={item.image}
          name={item.name}
          price={item.price}
          key={item._id}
          />
        ))
        }
      </div>
    </div>
  );
}

export default BurgerIngredientsSection