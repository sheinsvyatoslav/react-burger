import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import OrderFeed from "../../components/order-feed/order-feed";
import OrdersStats from "../../components/orders-stats/orders-stats";
import {
  wsConnectionStart,
  wsConnectionClosed,
} from "../../services/slices/websocket";
import { BASE_WEBSOCKET_URL } from "../../utils/constants";
import feedPageStyles from "./feed-page.module.scss";

const FeedPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsConnectionStart(`${BASE_WEBSOCKET_URL}/all`));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  return (
    <main className={feedPageStyles.main}>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={feedPageStyles.container}>
        <OrderFeed />
        <OrdersStats />
      </div>
    </main>
  );
};

export default FeedPage;
