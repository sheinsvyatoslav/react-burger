import { useRef, useCallback, FC, DragEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux-hooks";
import { useDrag, useDrop } from "react-dnd";
import { XYCoord } from "dnd-core";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  deleteConstructorIngredient,
  updateConstructorList,
} from "../../services/slices/ingredients";
import { TDraggingCard } from "../../utils/constants";
import constructorCardStyles from "./constructor-card.module.css";

interface TConstructorCard {
  item: TDraggingCard;
  index: number;
}

interface IDragItem {
  id: string;
  index: number;
}

const ConstructorCard: FC<TConstructorCard> = ({ item, index }) => {
  const { noBunIngredients } = useAppSelector(
    (state) => state.ingredients.constructorIngredients
  );
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const id = item.dragId;

  const [{ opacity }, drag] = useDrag({
    type: "constructor-cards",
    item: () => ({
      id: id,
      index: noBunIngredients.findIndex(
        (item: TDraggingCard) => item.dragId === id
      ),
    }),
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = noBunIngredients[dragIndex];
      const newCards = [...noBunIngredients];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);
      dispatch(updateConstructorList(newCards));
    },
    [noBunIngredients, dispatch]
  );

  const [, drop] = useDrop({
    accept: "constructor-cards",
    hover(item: IDragItem, monitor) {
      console.log(item);
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
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

  if (item.type !== "bun") drag(drop(ref));
  const preventDefault = (e: DragEvent) => e.preventDefault();

  return (
    <div
      className={constructorCardStyles.card}
      ref={ref}
      style={{ opacity }}
      onDrop={preventDefault}
    >
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

export default ConstructorCard;
