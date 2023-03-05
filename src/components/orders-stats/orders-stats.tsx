import { useMemo } from "react";

import { useAppSelector } from "../../hooks/redux-hooks";
import { Order } from "../order-card/order-card";

import styles from "./orders-stats.module.scss";

const ordersInList = 20;

export const OrdersStats = () => {
  const { total, totalToday, orders } = useAppSelector((state) => state.ws);
  const { doneOrders, pendingOrders } = useMemo(() => {
    const doneOrders: Order[] = [];
    const pendingOrders: Order[] = [];

    if (!orders) {
      return { doneOrders, pendingOrders };
    }

    orders.slice(0, ordersInList).forEach((order) => {
      if (order.status === "done") {
        doneOrders.push(order);
      } else if (order.status === "pending") {
        pendingOrders.push(order);
      }
    });

    return { doneOrders, pendingOrders };
  }, [orders]);

  return (
    <section>
      <div className={styles.statuses}>
        <div className={styles.statusesGroup}>
          <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
          <div className={styles.numbers}>
            {doneOrders.map((item) => (
              <p
                key={item.number}
                className={`${styles.doneNumber} text text_type_digits-default mb-2`}
              >
                {item.number}
              </p>
            ))}
          </div>
        </div>
        <div className={styles.statusesGroup}>
          <h3 className="text text_type_main-medium mb-6">В работе:</h3>
          <div className={styles.numbers}>
            {pendingOrders.map((item) => (
              <p key={item.number} className="text text_type_digits-default mb-2">
                {item.number}
              </p>
            ))}
          </div>
        </div>
      </div>
      <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
      <p className={`${styles.number} text text_type_digits-large`}>{total}</p>
      <h3 className="text text_type_main-medium mt-15">Выполнено за сегодня:</h3>
      <p className={`${styles.number} text text_type_digits-large`}>{totalToday}</p>
    </section>
  );
};
