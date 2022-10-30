import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { v1 } from "uuid";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import ConstructorCard from "../constructor-card/constructor-card";
import burgerConstructorStyles from "./burger-constructor.module.css";
import { createOrder } from "../../services/actions/order";

import { OPEN_ORDER_DETAILS_POPUP } from "../../services/actions/popups";
import {
  GET_CONSTRUCTOR_INGREDIENTS,
  ADD_CONSTRUCTOR_INGREDIENT,
} from "../../services/actions/ingredients";
import { GET_TOTAL_PRICE } from "../../services/actions/order";
import { CLOSE_POPUPS } from "../../services/actions/popups";

function BurgerConstructor() {
  const { isOrderPopupOpened } = useSelector((state) => state.popups);
  const { bun, noBunIngredients } = useSelector(
    (state) => state.ingredients.constructorIngredients
  );
  const { ingredients } = useSelector((state) => state.ingredients);
  const { totalPrice } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const handleClosePopup = useCallback(() => {
    dispatch({ type: CLOSE_POPUPS });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: GET_CONSTRUCTOR_INGREDIENTS,
      ingredients: [],
    });
  }, [dispatch, ingredients]);

  useEffect(() => {
    dispatch({
      type: GET_TOTAL_PRICE,
      bun: bun,
      noBunIngredients: noBunIngredients,
    });
  }, [dispatch, noBunIngredients, bun]);

  const handleOrderClick = () => {
    dispatch(
      createOrder([bun._id, ...noBunIngredients.map((item) => item._id)])
    );
    dispatch({ type: OPEN_ORDER_DETAILS_POPUP });
  };

  const [, ingridientsTarget] = useDrop({
    accept: "ingredients",
    drop(ingredient) {
      dispatch({
        type: ADD_CONSTRUCTOR_INGREDIENT,
        draggedIngridient: ingredients.find(
          (item) => item._id === ingredient.id
        ),
        dragId: v1(),
      });
    },
  });

  return (
    <section className={`${burgerConstructorStyles.main} ml-4 mr-4 pb-13`}>
      <div
        className={`${burgerConstructorStyles.container} mt-25`}
        ref={ingridientsTarget}
      >
        {!bun && (
          <p
            className={`text text_type_main-medium ${burgerConstructorStyles.tip}`}
          >
            Пожалуйста, перенесите сюда булку для создания заказа
          </p>
        )}
        <div className="ml-8 pr-4">
          {bun && (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}
        </div>
        {noBunIngredients && (
          <div className={`${burgerConstructorStyles.cards} pr-2`}>
            {noBunIngredients.map((item, i) => (
              <ConstructorCard item={item} key={item.dragId} index={i} />
            ))}
          </div>
        )}
        <div className="ml-8 pr-4">
          {bun && (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}
        </div>
      </div>
      <div className={`${burgerConstructorStyles.button} mt-10 mb-10`}>
        <div
          className={`${burgerConstructorStyles.price} mt-2 mb-2 mr-10 ml-5`}
        >
          <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          onClick={handleOrderClick}
          disabled={!bun}
        >
          Оформить заказ
        </Button>
      </div>
      <Modal
        isOpened={isOrderPopupOpened}
        handleClosePopup={handleClosePopup}
        title=""
      >
        <OrderDetails />
      </Modal>
    </section>
  );
}

export default BurgerConstructor;
