import { FC, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux-hooks";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import orderCardStyles from "./order-card.module.scss";
import { TOrder, maxOrderIngredients } from "../../utils/constants";

interface IOrderCard {
  order: TOrder;
}

const OrderCard: FC<IOrderCard> = ({ order }) => {
  let { name, number, createdAt, ingredients } = order;
  let { ingredients: allIngredients } = useAppSelector(
    (state) => state.ingredients
  );
  const location = useLocation();

  const orderIngredients = useMemo(
    () =>
      ingredients.map((item) => allIngredients.find((ing) => ing._id === item)),
    [ingredients, allIngredients]
  );

  const totalPrice = useMemo(
    () =>
      orderIngredients.reduce(
        (a, b) => a + (b!.type === "bun" ? b!.price * 2 : b!.price),
        0
      ),
    [orderIngredients]
  );

  return (
    <Link
      to={{
        pathname: `${location.pathname}/${number}`,
        state: { background: location, order, totalPrice, orderIngredients },
      }}
      className={orderCardStyles.link}
    >
      <article className={`${orderCardStyles.card} p-6`}>
        <div className={orderCardStyles.info}>
          <p className="text text_type_digits-default">#{number}</p>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(createdAt)} />
          </p>
        </div>
        <p className="text text_type_main-medium mb-6 mt-6">{name}</p>
        <div className={orderCardStyles.main}>
          <div className={orderCardStyles.ingredients}>
            {orderIngredients
              .slice(0, maxOrderIngredients)
              .map((ingredient, i) => (
                <div
                  key={i}
                  className={orderCardStyles.ingredient}
                  style={{ zIndex: maxOrderIngredients - i - 1 }}
                >
                  <img
                    className={orderCardStyles.image}
                    style={{
                      opacity:
                        i === maxOrderIngredients - 1 &&
                        i !== orderIngredients.length - 1
                          ? 0.6
                          : 1,
                    }}
                    src={ingredient?.image}
                    alt={ingredient?.name}
                  />
                  {i === maxOrderIngredients - 1 &&
                    i !== orderIngredients.length - 1 && (
                      <p
                        className={`${orderCardStyles.tip} text text_type_main-default`}
                      >
                        +{ingredients.length - maxOrderIngredients + 1}
                      </p>
                    )}
                </div>
              ))}
          </div>
          <div className={orderCardStyles.price}>
            <p className="text text_type_digits-default mr-2">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default OrderCard;
