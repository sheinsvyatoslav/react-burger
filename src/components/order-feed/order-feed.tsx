import { useAppSelector } from "../../hooks/redux-hooks";
import { OrderCard } from "../order-card/order-card";

import styles from "./order-feed.module.scss";

export const OrderFeed = () => {
  const { orders } = useAppSelector((state) => state.ws);

  return (
    <section className={`${styles.container} mb-10`}>
      <div className={`${styles.orders} pr-2`}>
        {orders?.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </section>
  );
};
