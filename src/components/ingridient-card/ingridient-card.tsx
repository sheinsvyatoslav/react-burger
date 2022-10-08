import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import ingridientCardStyles from './ingridient-card.module.css';
import PropTypes, { InferProps } from 'prop-types';

IngridientCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

function IngridientCard({
  name,
  image,
  price, 
}: InferProps<typeof IngridientCard.propTypes> ) {
  return (
    <article className={ingridientCardStyles.card}>
      <img src={image} alt={name}/>
      <div className={`${ingridientCardStyles.price} mt-2 mb-2`}>
        <p className="text text_type_digits-default mr-2">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${ingridientCardStyles.name} text text_type_main-small mr-2 mb-6`}>{name}</p>
      <Counter count={1} size="small" />
    </article>
  );
}

export default IngridientCard