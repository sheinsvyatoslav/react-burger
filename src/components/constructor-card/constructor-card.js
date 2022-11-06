import { useRef, useCallback } from "react";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";

import { constructorCardType } from "../../utils/constants";
import constructorCardStyles from "./constructor-card.module.css";
import {
  DELETE_CONSTRUCTOR_INGREDIENT,
  UPDATE_CONSTRUCTOR_LIST,
} from "../../services/actions/ingredients";

const ConstructorCard = ({ item, index }) => {
  const { noBunIngredients } = useSelector(
    (state) => state.ingredients.constructorIngredients
  );
  const dispatch = useDispatch();
  const ref = useRef(null);
  const id = item.dragId;

  const [{ opacity }, drag] = useDrag({
    type: "constructor-cards",
    item: () => ({
      id: id,
      index: noBunIngredients.findIndex((item) => item.dragId === id),
    }),
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = noBunIngredients[dragIndex];
      const newCards = [...noBunIngredients];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);

      dispatch({
        type: UPDATE_CONSTRUCTOR_LIST,
        newCards: newCards,
      });
    },
    [noBunIngredients, dispatch]
  );

  const [, drop] = useDrop({
    accept: "constructor-cards",
    hover(item, monitor) {
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
      const clientOffset = monitor.getClientOffset();
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
  const preventDefault = (e) => e.preventDefault();

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
          dispatch({
            type: DELETE_CONSTRUCTOR_INGREDIENT,
            deletedIngredient: item,
          });
        }}
      />
    </div>
  );
};

ConstructorCard.propTypes = {
  item: constructorCardType,
  index: PropTypes.number.isRequired,
};

export default ConstructorCard;
