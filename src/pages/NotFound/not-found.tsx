import { useHistory } from "react-router-dom";

import styles from "./not-found.module.scss";

export const PageNotFound = () => {
  const history = useHistory();
  return (
    <section className={styles.main}>
      <h2 className="text text_type_main-large mb-5">404</h2>
      <p className="text text_type_main-medium mb-5">Страница не найдена</p>
      <button onClick={() => history.goBack()} className={`${styles.link} text text_type_main-default`}>
        Назад
      </button>
    </section>
  );
};
