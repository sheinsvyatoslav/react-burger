import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getIngredients } from "../../services/actions/ingredients";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ingredientPageStyles from "../ingredient-page/ingredient-page.module.css";

const IngredientPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { ingredients } = useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <section className={ingredientPageStyles.main}>
      <h2 className={`${ingredientPageStyles.title} text text_type_main-large`}>
        Детали ингредиента
      </h2>
      {ingredients
        .filter((item) => item._id === id)
        .map((item) => (
          <IngredientDetails ingredient={item} key={id} />
        ))}
    </section>
  );
};

export default IngredientPage;
