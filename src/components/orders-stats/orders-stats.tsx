import { useAppSelector } from "../../hooks/redux-hooks";
import { Order } from "../../utils/types";

import styles from "./orders-stats.module.scss";

export const OrdersStats = () => {
  const { total, totalToday, orders } = useAppSelector((state) => state.ws);

  return (
    <section className="ml-15">
      <div className={`${styles.statuses} mb-15`}>
        <div className={`${styles.statusesGroup} mr-9`}>
          <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
          <div className={styles.numbers}>
            {orders
              ?.slice(0, 30)
              .filter((item: Order) => item.status === "done")
              .map((item: Order) => (
                <p key={item.number} className={`${styles.doneNumber} text text_type_digits-default mb-2`}>
                  {item.number}
                </p>
              ))}
          </div>
        </div>
        <div className={styles.statusesGroup}>
          <h3 className="text text_type_main-medium mb-6">В работе:</h3>
          <div className={styles.numbers}>
            {orders
              ?.slice(0, 20)
              .filter((item: Order) => item.status === "pending")
              .map((item: Order) => (
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
