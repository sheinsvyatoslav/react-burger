import { useAppSelector } from "../../hooks/redux-hooks";
import { TOrder } from "../../utils/constants";
import OrderCard from "../order-card/order-card";
import orderFeedStyles from "./order-feed.module.scss";

const OrderFeed = () => {
  const { allOrders } = useAppSelector((state) => state.ws);

  return (
    <section className={`${orderFeedStyles.container} mb-10`}>
      <div className={`${orderFeedStyles.orders} pr-2`}>
        {allOrders?.map((order: TOrder) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </section>
  );
};

export default OrderFeed;
