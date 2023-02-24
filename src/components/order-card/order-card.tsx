import { FC, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";

import { useAppSelector } from "../../hooks/redux-hooks";

import styles from "./order-card.module.scss";

export type Order = {
  _id: string;
  name: string;
  number: number;
  status: string;
  createdAt: Date;
  ingredients: ReadonlyArray<string>;
};

type OrderCardProps = {
  order: Order;
};

const maxIngredients = 6;

export const OrderCard: FC<OrderCardProps> = ({ order }) => {
  const { name, number, createdAt, ingredients } = order;
  const { ingredients: allIngredients } = useAppSelector((state) => state.ingredients);
  const location = useLocation();

  const orderIngredients = useMemo(() => {
    if (!allIngredients) {
      return [];
    }
    return ingredients.map(
      (item) => allIngredients.filter((ingredient) => ingredient._id === item)[0]
    );
  }, [ingredients, allIngredients]);

  const totalPrice = useMemo(
    () =>
      orderIngredients.reduce(
        (sum, ingredient) => sum + ingredient.price * (ingredient.type === "bun" ? 2 : 1),
        0
      ),
    [orderIngredients]
  );

  const isMoreIngredients = (i: number) =>
    i === maxIngredients - 1 && maxIngredients < orderIngredients.length;

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
            {orderIngredients.slice(0, maxIngredients).map((ingredient, i) => (
              <div key={i} className={styles.ingredient} style={{ zIndex: maxIngredients - i - 1 }}>
                <img
                  className={cn(styles.image, { [styles.lastIngredient]: isMoreIngredients(i) })}
                  src={ingredient.image}
                  alt={ingredient.name}
                />
                {isMoreIngredients(i) && (
                  <p className={`${styles.tip} text text_type_main-default`}>
                    +{ingredients.length - maxIngredients + 1}
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
