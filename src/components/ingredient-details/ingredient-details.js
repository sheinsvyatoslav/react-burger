import { useSelector } from "react-redux";
import ingredientDetailsStyles from "./ingredient-details.module.css";

function IngredientDetails() {
  const { selectedIngredient } = useSelector((state) => state.ingredients);

  return (
    <div className={ingredientDetailsStyles.container}>
      <img
        className="mb-4"
        src={selectedIngredient.image_large}
        alt={selectedIngredient.name}
      />
      <h2
        className={`${ingredientDetailsStyles.name} text text_type_main-medium mb-8 `}
      >
        {selectedIngredient.name}
      </h2>
      <div className={ingredientDetailsStyles.infoContainer}>
        <div className={ingredientDetailsStyles.info}>
          <p className="text text_type_main-small text_color_inactive mb-2">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {selectedIngredient.calories}
          </p>
        </div>
        <div className={ingredientDetailsStyles.info}>
          <p className="text text_type_main-small text_color_inactive mb-2">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {selectedIngredient.proteins}
          </p>
        </div>
        <div className={ingredientDetailsStyles.info}>
          <p className="text text_type_main-small text_color_inactive mb-2">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {selectedIngredient.fat}
          </p>
        </div>
        <div className={ingredientDetailsStyles.info}>
          <p className="text text_type_main-small text_color_inactive mb-2">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {selectedIngredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
}

export default IngredientDetails;
