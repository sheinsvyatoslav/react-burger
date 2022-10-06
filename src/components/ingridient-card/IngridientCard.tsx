import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import './IngridientCard.css'
type AppProps = {
  name: string,
  image: string,
  price: number,
}

function IngridientCard(props: AppProps) {
  return (
    <article className="ingridient-card">
      <img src={props.image} alt={props.name}/>
      <div className="ingridient-card__price mt-2 mb-2">
        <p className="text text_type_digits-default mr-2">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-small mr-2 mb-6" style={{textAlign: 'center'}}>{props.name}</p>
      <Counter count={1} size="small" />
    </article>
  );
}

export default IngridientCard