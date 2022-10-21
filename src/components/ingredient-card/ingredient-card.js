import { useState } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientCardStyles from './ingredient-card.module.css';
import PropTypes from 'prop-types';
import { cardTypes } from '../../utils/constants';

IngredientCard.propTypes = {
  card: cardTypes,
  handleOpenIngredientPopup: PropTypes.func.isRequired
};

function IngredientCard({ card, handleOpenIngredientPopup }) {
  const [count, setCount] = useState(1);

  const handleClickCard = () => {
    handleOpenIngredientPopup(card);
  }

  return (
    <article className={ingredientCardStyles.card} onClick={handleClickCard}>
      <img src={card.image} alt={card.name}/>
      <div className={`${ingredientCardStyles.price} mt-2 mb-2`}>
        <p className="text text_type_digits-default mr-2">{card.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${ingredientCardStyles.name} text text_type_main-small mr-2 mb-6`}>{card.name}</p>
      {count > 0 && <Counter count={count} size="small" />}
    </article>
  );
}

export default IngredientCard