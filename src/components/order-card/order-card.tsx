import { FC, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppSelector } from "../../hooks/redux-hooks";
import { maxOrderIngredients } from "../../utils/constants";
import { Order } from "../../utils/types";

import styles from "./order-card.module.scss";

type OrderCardProps = {
  order: Order;
};

export const OrderCard: FC<OrderCardProps> = ({ order }) => {
  const { name, number, createdAt, ingredients } = order;
  const { ingredients: allIngredients } = useAppSelector((state) => state.ingredients);
  const location = useLocation();

  const orderIngredients = useMemo(
    () => ingredients.map((item) => allIngredients!.filter((ing) => ing._id === item)[0]),
    [ingredients, allIngredients]
  );

  const totalPrice = useMemo(
    () => orderIngredients.reduce((a, b) => a + b.price * (b.type === "bun" ? 2 : 1), 0),
    [orderIngredients]
  );

  return (
    <Link
      to={{
        pathname: `${location.pathname}/${number}`,
        state: { background: location, order, totalPrice, orderIngredients },
      }}
      className={styles.link}
    >
      <article className={`${styles.card} p-6`}>
        <div className={styles.info}>
          <p className="text text_type_digits-default">#{number}</p>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(createdAt)} />
          </p>
        </div>
        <p className="text text_type_main-medium mb-6 mt-6">{name}</p>
        <div className={styles.main}>
          <div className={styles.ingredients}>
            {orderIngredients.slice(0, maxOrderIngredients).map((ingredient, i) => (
              <div key={i} className={styles.ingredient} style={{ zIndex: maxOrderIngredients - i - 1 }}>
                <img
                  className={styles.image}
                  style={{
                    opacity: i === maxOrderIngredients - 1 && i !== orderIngredients.length - 1 ? 0.6 : 1,
                  }}
                  src={ingredient?.image}
                  alt={ingredient?.name}
                />
                {i === maxOrderIngredients - 1 && i !== orderIngredients.length - 1 && (
                  <p className={`${styles.tip} text text_type_main-default`}>
                    +{ingredients.length - maxOrderIngredients + 1}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className={styles.price}>
            <p className="text text_type_digits-default mr-2">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </article>
    </Link>
  );
};
