import ingredientDetailsStyles from './ingredient-details.module.css'
import { cardTypes } from '../../utils/constants';

IngredientDetails.propTypes = {
  card: cardTypes,
};

function IngredientDetails({ card }) {

  return (
    <div className={ingredientDetailsStyles.container}>
      <img className='mb-4' src={card.image_large} alt={card.name} />
      <h2 className={`${ingredientDetailsStyles.name} text text_type_main-medium mb-8 `}>{card.name} </h2>
      <div className={ingredientDetailsStyles.infoContainer}>
        <div className={ingredientDetailsStyles.info}>
          <p className="text text_type_main-small text_color_inactive mb-2">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{card.calories}</p>
        </div>
        <div className={ingredientDetailsStyles.info}>
          <p className="text text_type_main-small text_color_inactive mb-2">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{card.proteins}</p>
        </div>
        <div className={ingredientDetailsStyles.info}>
          <p className="text text_type_main-small text_color_inactive mb-2">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{card.fat}</p>
        </div>
        <div className={ingredientDetailsStyles.info}>
          <p className="text text_type_main-small text_color_inactive mb-2">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{card.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
}

export default IngredientDetails