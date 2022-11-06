import { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import IngredientCard from "../ingredient-card/ingredient-card";
import burgerIngredientsSectionStyles from "./burger-ingredients-section.module.css";
import { getIngredients } from "../../services/actions/ingredients";

const BurgerIngredientsSection = ({ name, category, innerRef }) => {
  const dispatch = useDispatch();

  const { ingredients } = useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const content = useMemo(() => {
    return ingredients.map((ingredient) => {
      return (
        ingredient.type === category && (
          <IngredientCard
            ingredient={ingredient}
            key={ingredient._id}
            category={category}
          />
        )
      );
    });
  }, [ingredients, category]);

  return (
    <div className="mb-10" ref={innerRef}>
      <h2 className="text text_type_main-medium mb-6">{name}</h2>
      <div className={burgerIngredientsSectionStyles.cards}>{content}</div>
    </div>
  );
};

BurgerIngredientsSection.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  innerRef: PropTypes.func.isRequired,
};

export default BurgerIngredientsSection;
