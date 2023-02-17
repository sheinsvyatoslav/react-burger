import { FC, useCallback, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { XYCoord } from "dnd-core";

import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import {
  deleteConstructorIngredient,
  updateConstructorList,
} from "../../services/slices/ingredients/ingredients";
import { Card } from "../ingredient-card/ingredient-card";

import styles from "./constructor-card.module.scss";

export type DraggingCard = { dragId: string } & Card;

type ConstructorCardProps = {
  item: DraggingCard;
  index: number;
};

type DragItem = {
  id: string;
  index: number;
};

export const ConstructorCard: FC<ConstructorCardProps> = ({ item, index }) => {
  const { noBunIngredients } = useAppSelector((state) => state.ingredients.constructorIngredients);
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const id = item.dragId;

  const [{ opacity }, drag] = useDrag({
    type: "constructor-cards",
    item: () => ({
      id,
      index: noBunIngredients?.findIndex((item: DraggingCard) => item.dragId === id),
    }),
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      if (noBunIngredients) {
        const dragCard = noBunIngredients[dragIndex];
        const newCards = [...(noBunIngredients ?? [])];
        newCards.splice(dragIndex, 1);
        newCards.splice(hoverIndex, 0, dragCard);
        dispatch(updateConstructorList(newCards));
      }
    },
    [noBunIngredients, dispatch]
  );

  const [, drop] = useDrop({
    accept: "constructor-cards",
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset() as XYCoord;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  if (item.type !== "bun") {
    drag(drop(ref));
  }

  return (
    <div className={styles.card} ref={ref} style={{ opacity }} onDrop={(e) => e.preventDefault()}>
      <div className="pr-2">
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => {
          dispatch(deleteConstructorIngredient(item));
        }}
      />
    </div>
  );
};
