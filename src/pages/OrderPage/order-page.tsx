import { useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import OrderContent from "../../components/order-content/order-content";
import { getOrderByNumber } from "../../services/slices/order";

import orderPageStyles from "./order-page.module.scss";

const OrderPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectedOrder } = useAppSelector((state) => state.order);
  let { ingredients: allIngredients } = useAppSelector(
    (state) => state.ingredients
  );

  useEffect(() => {
    dispatch(getOrderByNumber(Number(id)));
  }, [dispatch, id]);

  const orderIngredients = useMemo(
    () =>
      selectedOrder?.ingredients.map(
        (item) => allIngredients.filter((ing) => ing._id === item)[0]
      ),
    [allIngredients, selectedOrder]
  );

  const totalPrice = useMemo(
    () =>
      orderIngredients?.reduce(
        (a, b) => a + b.price * (b.type === "bun" ? 2 : 1),
        0
      ),
    [orderIngredients]
  );

  return (
    <section className={orderPageStyles.main}>
      <OrderContent
        key={selectedOrder?.number}
        order={selectedOrder}
        totalPrice={totalPrice}
        orderIngredients={orderIngredients}
      />
    </section>
  );
};

export default OrderPage;
