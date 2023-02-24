import { FC } from "react";

import styles from "./ingredient-page.module.scss";

type IngredientFeatureProps = {
  name: string;
  value: number;
};

export const IngredientFeature: FC<IngredientFeatureProps> = ({ name, value }) => {
  return (
    <div className={styles.info}>
      <p className="text text_type_main-small text_color_inactive mb-2">{name}</p>
      <p className="text text_type_digits-default text_color_inactive">{value}</p>
    </div>
  );
};
