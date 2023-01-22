import { FC } from "react";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TOrder, TCard } from "../../utils/types";

import orderContentStyles from "./order-content.module.scss";

interface IOrderContent {
  order: TOrder | null;
  totalPrice?: number;
  orderIngredients?: ReadonlyArray<TCard>;
}

const OrderContent: FC<IOrderContent> = ({
  order,
  totalPrice,
  orderIngredients,
}) => {
  return (
    <>
      <p
        className={`${orderContentStyles.number} text text_type_digits-default mb-10`}
      >
        #{order?.number}
      </p>
      <p className="text text_type_main-medium mb-3">{order?.name}</p>
      {order?.status === "done" ? (
        <p
          className={`${orderContentStyles.done} text text_type_main-default mb-15`}
        >
          Выполнен
        </p>
      ) : (
        <p className="text text_type_main-default mb-15">
          {order?.status === "pending" ? "Готовится" : "Создан"}
        </p>
      )}

      <p className="text text_type_main-medium mb-6">Состав:</p>
      <div className={`${orderContentStyles.cards} mb-10 pr-6`}>
        {orderIngredients?.map((item, i) => (
          <div className={orderContentStyles.card} key={i}>
            <div className={orderContentStyles.ingredient}>
              <img
                className={orderContentStyles.image}
                src={item.image}
                alt={item.name}
              />
            </div>
            <p
              className={`${orderContentStyles.name} text text_type_main-default ml-4`}
            >
              {item.name}
            </p>
            <div className={orderContentStyles.price}>
              <p className="text text_type_digits-default mr-2">
                {item.type === "bun" ? `2 x ${item.price}` : item.price}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        ))}
      </div>
      <div className={`${orderContentStyles.info} mt-10`}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order?.createdAt || "")} />
        </p>
        <div className={orderContentStyles.price}>
          <p className="text text_type_digits-default mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </>
  );
};

export default OrderContent;
