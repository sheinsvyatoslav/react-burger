import pageNotFoundStyles from "./not-found.module.css";
import history from "../../utils/history";

const PageNotFound = () => {
  return (
    <section className={pageNotFoundStyles.main}>
      <h2 className="text text_type_main-large mb-5">404</h2>
      <p className="text text_type_main-medium mb-5">Страница не найдена</p>
      <button
        onClick={() => history.go(-1)}
        className={`${pageNotFoundStyles.link} text text_type_main-default`}
      >
        Назад
      </button>
    </section>
  );
};

export default PageNotFound;
