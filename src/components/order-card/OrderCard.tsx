import {CurrencyIcon, DeleteIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import './OrderCard.css'
type AppProps = {
  name: string,
  image: string,
  price: number,
}

function OrderCard(props: AppProps) {
  return (
    <article className="order-card pt-4 pb-4 mb-4">
      <DragIcon type="primary" />
      <img className="order-card__image pr-5 pl-6" src={props.image} alt={props.name}/>
      <p className="text text_type_main-small mr-2" style={{width: '254px', verticalAlign: 'center'}}>{props.name}</p>
      <div className="order-card__price mt-2 mb-2 mr-5 ml-5">
        <p className="text text_type_digits-default mr-2">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <DeleteIcon type="primary"/>
    </article>
  );
}

export default OrderCard