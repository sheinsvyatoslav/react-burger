import { FC } from "react";
import { useAppSelector } from "../../hooks/redux-hooks";
import { useHistory, useLocation, Link } from "react-router-dom";
import { useDrag } from "react-dnd";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { TCard } from "../../utils/constants";

import ingredientCardStyles from "./ingredient-card.module.scss";

interface IIngredientCard {
  ingredient: TCard;
  category: string;
}

const IngredientCard: FC<IIngredientCard> = ({ ingredient, category }) => {
  const { ingredientsCount } = useAppSelector((state) => state.ingredients);
  const { constructorIngredients } = useAppSelector(
    (state) => state.ingredients
  );
  const history = useHistory();
  const location = useLocation();
  const id = ingredient._id;

  const handleCardClick = () => {
    history.replace(`/ingredients/${id}`);
  };

  const [{ opacity }, ref] = useDrag({
    type: "ingredients",
    item: { id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <Link
      to={{
        pathname: `/ingredients/${id}`,
        state: { background: location, ingredient },
      }}
      className={ingredientCardStyles.link}
    >
      <article
        className={ingredientCardStyles.card}
        onClick={handleCardClick}
        style={{ opacity }}
        ref={ref}
      >
        <img src={ingredient.image} alt={ingredient.name} />
        <div className={`${ingredientCardStyles.price} mt-2 mb-2`}>
          <p className="text text_type_digits-default mr-2">
            {ingredient.price}
          </p>
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
    </Link>
  );
};

export default IngredientCard;
