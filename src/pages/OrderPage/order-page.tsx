import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import { OrderContent } from "../../components/order-content/order-content";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getOrderByNumber } from "../../services/slices/order/order";

import styles from "./order-page.module.scss";

export const OrderPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectedOrder } = useAppSelector((state) => state.order);
  const { ingredients: allIngredients } = useAppSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(getOrderByNumber(Number(id)));
  }, [dispatch, id]);

  const orderIngredients = useMemo(() => {
    if (!allIngredients) {
      return [];
    }
    return selectedOrder?.ingredients.map(
      (item) => allIngredients.filter((ing) => ing._id === item)[0]
    );
  }, [allIngredients, selectedOrder]);

  const totalPrice = useMemo(
    () => orderIngredients?.reduce((a, b) => a + b.price * (b.type === "bun" ? 2 : 1), 0),
    [orderIngredients]
  );

  return (
    <section className={styles.main}>
      <OrderContent
        key={selectedOrder?.number}
        order={selectedOrder}
        totalPrice={totalPrice}
        orderIngredients={orderIngredients}
      />
    </section>
  );
};
