import { useAppSelector } from "../../hooks/redux-hooks";
import orderDoneImage from "../../images/order-done.png";

import styles from "./order-details.module.scss";

export const OrderDetails = () => {
  const orderNumber = useAppSelector((state) => state.order.orderNumber);

  return (
    <div className={styles.container}>
      <p className={`${styles.number} text text_type_digits-large`} data-at-selector="order-number">
        {orderNumber}
      </p>
      <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
      <img className={styles.image} src={orderDoneImage} alt="Заказ выполнен" />
      <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};
