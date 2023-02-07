import { FC } from "react";

import { Card } from "../../../components/ingredient-card/ingredient-card";

import ingredientDetailsStyles from "./ingredient-details.module.scss";

type IngredientDetailsProps = {
  ingredient?: Card;
};

export const IngredientDetails: FC<IngredientDetailsProps> = ({
  ingredient,
}) => {
  return (
    <div>
      <h2
        className={`${ingredientDetailsStyles.title} text text_type_main-large`}
      >
        Детали ингредиента
      </h2>
      <div className={ingredientDetailsStyles.container}>
        <img
          className="mb-4"
          src={ingredient?.image_large}
          alt={ingredient?.name}
        />
        <h2
          className={`${ingredientDetailsStyles.name} text text_type_main-medium mb-8 `}
          data-at-selector="ingredient-details-name"
        >
          {ingredient?.name}
        </h2>
        <div className={ingredientDetailsStyles.infoContainer}>
          <div className={ingredientDetailsStyles.info}>
            <p className="text text_type_main-small text_color_inactive mb-2">
              Калории,ккал
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient?.calories}
            </p>
          </div>
          <div className={ingredientDetailsStyles.info}>
            <p className="text text_type_main-small text_color_inactive mb-2">
              Белки, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient?.proteins}
            </p>
          </div>
          <div className={ingredientDetailsStyles.info}>
            <p className="text text_type_main-small text_color_inactive mb-2">
              Жиры, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient?.fat}
            </p>
          </div>
          <div className={ingredientDetailsStyles.info}>
            <p className="text text_type_main-small text_color_inactive mb-2">
              Углеводы, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient?.carbohydrates}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
