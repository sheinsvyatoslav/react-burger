import { useAppSelector } from "../../hooks/redux-hooks";
import { TOrder } from "../../utils/constants";
import ordersStatsStyles from "./orders-stats.module.scss";

const OrdersStats = () => {
  const { totalOrders, totalToday, allOrders } = useAppSelector(
    (state) => state.ws
  );

  return (
    <section className="ml-15">
      <div className={`${ordersStatsStyles.statuses} mb-15`}>
        <div className={`${ordersStatsStyles.statusesGroup} mr-9`}>
          <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
          <div className={ordersStatsStyles.numbers}>
            {allOrders
              ?.slice(0, 30)
              .filter((item: TOrder) => item.status === "done")
              .map((item: TOrder) => (
                <p
                  key={item.number}
                  className={`${ordersStatsStyles.doneNumber} text text_type_digits-default mb-2`}
                >
                  {item.number}
                </p>
              ))}
          </div>
        </div>
        <div className={ordersStatsStyles.statusesGroup}>
          <h3 className="text text_type_main-medium mb-6">В работе:</h3>
          <div className={ordersStatsStyles.numbers}>
            {allOrders
              ?.slice(0, 20)
              .filter((item: TOrder) => item.status === "pending")
              .map((item: TOrder) => (
                <p
                  key={item.number}
                  className="text text_type_digits-default mb-2"
                >
                  {item.number}
                </p>
              ))}
          </div>
        </div>
      </div>
      <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
      <p className={`${ordersStatsStyles.number} text text_type_digits-large`}>
        {totalOrders}
      </p>
      <h3 className="text text_type_main-medium mt-15">
        Выполнено за сегодня:
      </h3>
      <p className={`${ordersStatsStyles.number} text text_type_digits-large`}>
        {totalToday}
      </p>
    </section>
  );
};

export default OrdersStats;
