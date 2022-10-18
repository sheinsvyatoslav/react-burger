import PropTypes, { InferProps } from 'prop-types';
import OrderDetailsStyles from './order-details.module.css';
import orderDoneImage from '../../images/order-done.png';

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired,
};

function OrderDetails({ orderNumber }: InferProps<typeof OrderDetails.propTypes>) {
  return (
    <div className={OrderDetailsStyles.container}>
      <p className="text text_type_digits-large">{orderNumber}</p>
      <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
      <img className={OrderDetailsStyles.image} src={orderDoneImage} alt='Заказ выполнен'/>
      <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}

export default OrderDetails