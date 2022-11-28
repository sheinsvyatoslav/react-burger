import { FC, useMemo } from "react";
import { useAppSelector } from "../../hooks/redux-hooks";

import IngredientCard from "../ingredient-card/ingredient-card";
import { TCard } from "../../utils/constants";
import burgerIngredientsSectionStyles from "./burger-ingredients-section.module.scss";

interface IBurgerIngredientsSection {
  name: string;
  category: string;
  innerRef: (node?: Element | null | undefined) => void;
}

const BurgerIngredientsSection: FC<IBurgerIngredientsSection> = ({
  name,
  category,
  innerRef,
}) => {
  const { ingredients } = useAppSelector((state) => state.ingredients);

  const content = useMemo(() => {
    return ingredients.map((ingredient: TCard) => {
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

export default BurgerIngredientsSection;
