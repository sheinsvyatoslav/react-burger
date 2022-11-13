import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import IngredientDetails from "../ingredient-details/ingredient-details";
import ingredientPageStyles from "../ingredient-page/ingredient-page.module.css";

const IngredientPage = () => {
  const { id } = useParams();
  const { ingredients } = useSelector((state) => state.ingredients);

  return (
    <section className={ingredientPageStyles.main}>
      {ingredients
        .filter((item) => item._id === id)
        .map((item) => (
          <IngredientDetails ingredient={item} key={id} />
        ))}
    </section>
  );
};

export default IngredientPage;
