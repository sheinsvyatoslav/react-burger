import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingridientCardStyles from './ingridient-card.module.css';
import PropTypes, { InferProps } from 'prop-types';
import { cardTypes } from '../../utils/constants';

IngridientCard.propTypes = {
  card: cardTypes,
  onOpenIngridientPopup: PropTypes.func.isRequired
};

function IngridientCard({ card, onOpenIngridientPopup }: InferProps<typeof IngridientCard.propTypes> ) {

  const handleClickCard = () => {
    onOpenIngridientPopup(card)
  }

  return (
    <article className={ingridientCardStyles.card} onClick={handleClickCard}>
      <img src={card.image} alt={card.name}/>
      <div className={`${ingridientCardStyles.price} mt-2 mb-2`}>
        <p className="text text_type_digits-default mr-2">{card.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${ingridientCardStyles.name} text text_type_main-small mr-2 mb-6`}>{card.name}</p>
      <Counter count={1} size="small" />
    </article>
  );
}

export default IngridientCard