import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import { cardTypes } from "../../utils/constants";
import ingredientCardStyles from "./ingredient-card.module.css";
import { ADD_INGREDIENT_DETAILS } from "../../services/actions/ingredients";
import { OPEN_INGREDIENT_DETAILS_POPUP } from "../../services/actions/popups";

IngredientCard.propTypes = {
  ingredient: cardTypes,
  category: PropTypes.string.isRequired,
};

function IngredientCard({ ingredient, category }) {
  const { ingredientsCount } = useSelector((state) => state.ingredients);
  const { constructorIngredients } = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();

  const handleCardClick = () => {
    dispatch({ type: OPEN_INGREDIENT_DETAILS_POPUP });
    dispatch({ type: ADD_INGREDIENT_DETAILS, selectedIngredient: ingredient });
  };
  const id = ingredient._id;

  const [{ opacity }, ref] = useDrag({
    type: "ingredients",
    item: { id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <article
      className={ingredientCardStyles.card}
      onClick={handleCardClick}
      style={{ opacity }}
      ref={ref}
    >
      <img src={ingredient.image} alt={ingredient.name} />
      <div className={`${ingredientCardStyles.price} mt-2 mb-2`}>
        <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p
        className={`${ingredientCardStyles.name} text text_type_main-small mr-2 mb-6`}
      >
        {ingredient.name}
      </p>
      {category === "bun" &&
      constructorIngredients.bun &&
      id === constructorIngredients.bun._id ? (
        <Counter count={1} size="small" />
      ) : ingredientsCount[id] ? (
        <Counter count={ingredientsCount[id]} size="small" />
      ) : (
        <></>
      )}
    </article>
  );
}

export default IngredientCard;
