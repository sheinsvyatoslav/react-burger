import OrderFeed from "../../components/order-feed/order-feed";
import OrdersStats from "../../components/orders-stats/orders-stats";
import feedPageStyles from "./feed-page.module.scss";

const FeedPage = () => {
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
