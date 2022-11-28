import { useAppSelector } from "../../../hooks/redux-hooks";
import { useParams } from "react-router-dom";

import IngredientDetails from "../ingredient-details/ingredient-details";
import { TCard } from "../../../utils/constants";
import ingredientPageStyles from "../ingredient-page/ingredient-page.module.scss";

const IngredientPage = () => {
  const { id } = useParams<{ id: string }>();
  const { ingredients } = useAppSelector((state) => state.ingredients);

  return (
    <section className={ingredientPageStyles.main}>
      {ingredients
        .filter((item: TCard) => item._id === id)
        .map((item: TCard) => (
          <IngredientDetails ingredient={item} key={id} />
        ))}
    </section>
  );
};

export default IngredientPage;
