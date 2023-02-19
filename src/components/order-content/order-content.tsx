import { FC } from "react";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

import { Card } from "../ingredient-card/ingredient-card";
import { Order } from "../order-card/order-card";

import styles from "./order-content.module.scss";

type OrderContentProps = {
  order: Order | null;
  totalPrice?: number;
  orderIngredients?: ReadonlyArray<Card>;
};

export const OrderContent: FC<OrderContentProps> = ({ order, totalPrice, orderIngredients }) => {
  return (
    <>
      <p className={`${styles.number} text text_type_digits-default mb-10`}>#{order?.number}</p>
      <p className="text text_type_main-medium mb-3">{order?.name}</p>
      {order?.status === "done" ? (
        <p className={`${styles.done} text text_type_main-default mb-15`}>Выполнен</p>
      ) : (
        <p className="text text_type_main-default mb-15">
          {order?.status === "pending" ? "Готовится" : "Создан"}
        </p>
      )}

      <p className="text text_type_main-medium mb-6">Состав:</p>
      <div className={`${styles.cards} mb-10 pr-6`}>
        {orderIngredients?.map((item, i) => (
          <div className={styles.card} key={i}>
            <div className={styles.ingredient}>
              <img className={styles.image} src={item.image} alt={item.name} />
            </div>
            <p className={`${styles.name} text text_type_main-default ml-4`}>{item.name}</p>
            <div className={styles.price}>
              <p className="text text_type_digits-default mr-2">
                {item.type === "bun" ? `2 x ${item.price}` : item.price}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        ))}
      </div>
      <div className={`${styles.info} mt-10`}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order?.createdAt || "")} />
        </p>
        <div className={styles.price}>
          <p className="text text_type_digits-default mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </>
  );
};
