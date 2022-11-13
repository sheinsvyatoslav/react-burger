import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDrop } from "react-dnd";
import { v1 } from "uuid";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import Modal from "../../../components/modal/modal";
import OrderDetails from "../order-details/order-details";
import ConstructorCard from "../constructor-card/constructor-card";
import { createOrder, getTotalPrice } from "../../../services/actions/order";
import {
  openOrderDetailsPopup,
  closeOrderPopup,
} from "../../../services/actions/popups";
import {
  addConstructorIngredient,
  clearConstructor,
  getConstructorIngredients,
} from "../../../services/actions/ingredients";
import { getCookie } from "../../../utils/cookie";
import burgerConstructorStyles from "./burger-constructor.module.css";

const BurgerConstructor = () => {
  const history = useHistory();
  const { isOrderPopupOpened } = useSelector((state) => state.popups);
  const { bun, noBunIngredients } = useSelector(
    (state) => state.ingredients.constructorIngredients
  );
  const { ingredients, constructorIngredients } = useSelector(
    (state) => state.ingredients
  );
  const { totalPrice } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const handleClosePopup = useCallback(() => {
    dispatch(closeOrderPopup());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getConstructorIngredients(constructorIngredients));
  }, [dispatch, constructorIngredients]);

  useEffect(() => {
    dispatch(getTotalPrice(bun, noBunIngredients));
  }, [dispatch, noBunIngredients, bun]);

  const handleOrderClick = () => {
    if (getCookie("accessToken")) {
      dispatch(
        createOrder([bun._id, ...noBunIngredients.map((item) => item._id)])
      );
      dispatch(openOrderDetailsPopup());
      dispatch(clearConstructor());
    } else history.replace("/login");
  };

  const [, ingridientsTarget] = useDrop({
    accept: "ingredients",
    drop(ingredient) {
      dispatch(
        addConstructorIngredient(
          ingredients.find((item) => item._id === ingredient.id),
          v1()
        )
      );
    },
  });

  return (
    <section className={`${burgerConstructorStyles.main} pb-13`}>
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
        <div className="ml-8 pr-4 pl-4">
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
          <div className={`${burgerConstructorStyles.cards} pr-2 pl-4`}>
            {noBunIngredients.map((item, i) => (
              <ConstructorCard item={item} key={item.dragId} index={i} />
            ))}
          </div>
        )}
        <div className="ml-8 pr-4 pl-4">
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
      <div className={`${burgerConstructorStyles.button} mt-10 mb-10 pr-4`}>
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
          aria-label={"Оформить заказ"}
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
};

export default BurgerConstructor;
