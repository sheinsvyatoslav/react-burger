import { useEffect } from "react";

import { OrderFeed } from "../../components/order-feed/order-feed";
import { OrdersStats } from "../../components/orders-stats/orders-stats";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { wsConnectionClosed, wsConnectionStart } from "../../services/slices/websocket/websocket";
import { BASE_WEBSOCKET_URL } from "../../utils/constants";

import styles from "./feed-page.module.scss";

export const FeedPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsConnectionStart(`${BASE_WEBSOCKET_URL}/all`));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={styles.container}>
        <OrderFeed />
        <OrdersStats />
      </div>
    </main>
  );
};
